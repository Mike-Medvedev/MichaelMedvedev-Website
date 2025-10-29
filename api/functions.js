import DateUtils from "./utils/DateUtils.js"
import DatabaseManager from "./database/db.js"
import ActivityService from "./services/Activity.service.js"
function _generateEveryDateSinceOneYearAgo() {
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

function _retrieveActivityCountsFromRange(startDay, endDay){
    const activityCountPerDay = ActivityService.getByRange(startDay, endDay)
}

export function createHeatMap() {
    const dates = _generateEveryDateSinceOneYearAgo();
    const startDay = dates.flat(1)[0];
    const endDay = dates.flat(1)[dates.flat(1).length - 1]

    _retrieveActivityCountsFromRange()

    //generate heatmap labels
    const currentMonth = new Date().toLocaleDateString("en-US", {month: "long"})
    const monthPrefixes = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

     //fetch number of activities completed for each day 
    const activityCountPerDay = ActivityService.getByRange(startDay, endDay) //[{date: "2025-05-05", count: 5}]
   
    const activityCountMap = new Map()
    for(const {date, count} of activityCountPerDay){ // transform results into a map {"2025-05-05": 5}
        activityCountMap.set(date, count)
    }
     //generate heatmap month labels, from current month last year till current month today
    //loop through array starting from currentMonth, if you reac end of array, go back to beginning until you hit 1 index before starting
    const currentMonthIndex = monthPrefixes.findIndex((month) => month === currentMonth.slice(0,3)) //get currentMonth in monthArray
    let monthLabelString = `` 
    let i = currentMonthIndex;
    do { // generate month label until the month is not the same month again i.e (oct 2024 - oct 2025)
        monthLabelString += `<td class="activity-label" colspan="4">${monthPrefixes[i]}</td>`
        i = (i + 1) % monthPrefixes.length;
    } while(i !== currentMonthIndex)

    let table = `
    <table> 
        <tr> 
        <td class="activity-label"></td>
            ${monthLabelString}
            <td class="activity-label" colspan="4">${monthPrefixes[currentMonthIndex]}</td>
        </tr>
        ` //add current month label after all month labels are added, oct - sept + oct
    let dayMap = {
        1: "Mon",
        3: "Wed",
        5: "Fri" 
    }

    const monthSuffix = {
        0: "th",
        1: "st",
        2: "nd",
        3: "rd",
        4: "th",
        5: "th",
        6: "th",
        7: "th",
        8: "th",
        9: "th",
    }
    
    // generate actual heat map
    for (let i = 0; i <= 6; i++) { //loop through each day of the week
        let string = `<tr>` 
        if(i in dayMap) string += `<td class="activity-label"><span>${dayMap[i]}</span></td>`; //generate column labels for teh days
        else string += `<td class="activity-label"></td>`; //empty labels omtting tuesday,thursday,saturday,sunday like github
        for (let week of dates) { //iterate over each week only one day at a time, so all mondays of the year, then all tuesdays etc. 
            if (!week[i]) continue; // each row of the heatmap contains the same weekday for every cell, row 1 = every monday from 2024-2025
            const currentDateObject = week[i];
            const currentDayString = week[i].toISOString().split("T")[0] //"2024-05-07"
            const activityCountPerDay = activityCountMap.get(currentDayString) || 0; 
            string += `<td data-activity-level="${activityCountPerDay}" data-date="${currentDayString}">
            <custom-tooltip for="${currentDayString}" popover>${activityCountPerDay > 0 ? activityCountPerDay : "No "} Activities on ${currentDateObject.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" })} ${currentDateObject.getUTCDate()}${monthSuffix[currentDateObject.getUTCDate() % 10]}</custom-tooltip>
            </td>` // generate table cell and tooltip html
        }
        string += `</tr>`
        table += string;
    }
    table += `</table>`;
    return table;
}