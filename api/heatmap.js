import DateUtils from "./utils/DateUtils.js"
import ActivityService from "./services/Activity.service.js"

const MONTH_PREFIXES = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_MAP = { 1: "Mon", 3: "Wed", 5: "Fri" }
const MONTH_SUFFIX = { 0: "th", 1: "st", 2: "nd", 3: "rd", 4: "th", 5: "th", 6: "th", 7: "th", 8: "th", 9: "th"}

function generateWeeksFromPastYear() {
    let currentDate = new Date()
    currentDate.setUTCHours(0, 0, 0, 0);
    let lastYearsDate = DateUtils.getDateOneYearAgo(currentDate)
    
    let dates = [];
    let weeks = [];
    //loop through everyday from last years date to today
    for (let i = lastYearsDate; i <= currentDate; i.setUTCDate(i.getUTCDate() + 1)) { //increment i by one day

        weeks.push(new Date(i)); 

        //push each week into dates array -> [ [week1] [week2] ]
        if (i.getUTCDay() === 6) {
            dates.push(weeks);
            weeks = [];
        }
    }
    // final week might not get pushed if last day is not sunday, so push
    if (weeks.length > 0) {
        dates.push(weeks)
    }
    return dates;

}



function calculateActivityLevel(activityCount, highestActivityCount) {
    const activityPercent = activityCount / highestActivityCount;
    if (!activityPercent || activityPercent === 0) return 0;
    if (activityPercent > 0 && activityPercent < 0.25) return 1;
    if (activityPercent >= 0.25 && activityPercent < 0.5) return 2;
    if (activityPercent >= 0.5 && activityPercent < 0.75) return 3;
    if (activityPercent >= 0.75 && activityPercent <= 1) return 4;

    return 0; 
}

export default async function renderHeatMap() {
    const dates = generateWeeksFromPastYear();
    const startDay = dates.flat(1)[0];
    const endDay = dates.flat(1)[dates.flat(1).length - 1]
    const currentMonth = new Date().toLocaleDateString("en-US", {month: "long"})

    const activityRecords = await ActivityService.getByRange(startDay, endDay) //[{date: "2025-05-05", count: 5}]
   
    const activityCountMap = new Map()
    for(const {date, count} of activityRecords){ // transform results into a map {"2025-05-05": 5}
        activityCountMap.set(date, count)
    }

    const highestActivityCount = Math.max(...activityCountMap.values());

    

    const currentMonthIndex = MONTH_PREFIXES.findIndex((month) => month === currentMonth.slice(0,3)) //get currentMonth in monthArray
    let monthLabelString = `` 
    let i = currentMonthIndex;
    
    // generate month label until the month is not the same month again i.e (oct 2024 - oct 2025)
    do { 
        monthLabelString += `<td class="activity-label" colspan="4">${MONTH_PREFIXES[i]}</td>`
        i = (i + 1) % MONTH_PREFIXES.length; //circle through array
    } while(i !== currentMonthIndex)

    //add current month label after all month labels are added, oct - sept + oct
    let table = `
    <table> 
        <tr> 
        <td class="activity-label"></td>
            ${monthLabelString}
            <td class="activity-label" colspan="4">${MONTH_PREFIXES[currentMonthIndex]}</td>
        </tr>
        ` 
  
    
    for (let i = 0; i <= 6; i++) { //loop through each day of the week

        let string = `<tr>` 
        if(i in DAY_MAP) string += `<td class="activity-label"><span>${DAY_MAP[i]}</span></td>`; //generate column labels for the days
        else string += `<td class="activity-label"></td>`; //empty labels omtting tuesday,thursday,saturday,sunday like github

        for (let week of dates) { //iterate over each week only one day at a time, so all mondays of the year, then all tuesdays etc. 
            if (!week[i]) continue; // each row of the heatmap contains the same weekday for every cell, row 1 = every monday from 2024-2025
            const currentDateObject = week[i];
            const currentDayString = DateUtils.trimTime(week[i]) //"2024-05-07"
            const countForCurrentDate = activityCountMap.get(currentDayString) || 0;
            string += `<td data-activity-level="${calculateActivityLevel(countForCurrentDate, highestActivityCount)}" data-date="${currentDayString}">
            <custom-tooltip for="${currentDayString}" popover>${countForCurrentDate > 0 ? countForCurrentDate : "No "} Activities on ${currentDateObject.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })} ${currentDateObject.getUTCDate()}${MONTH_SUFFIX[currentDateObject.getUTCDate() % 10]}</custom-tooltip>
            </td>` // generate table cell and tooltip html
        }

        string += `</tr>`
        table += string;
    }
    table += `</table>`;
    return table;
}