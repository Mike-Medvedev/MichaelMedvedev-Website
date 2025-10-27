function findFirstDayOfWeek(date){
    const firstDayOfWeek = new Date(date);
    const dayOfWeek = firstDayOfWeek.getDay();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayOfWeek)
    return firstDayOfWeek;
}
function createDates() {
    let currentDate = new Date()
    let lastYearsDate = new Date();
    lastYearsDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
    lastYearsDate = findFirstDayOfWeek(lastYearsDate);
    // starting on last years date, store that day in an datesay and then add one to that day

    //loop through everyday from last years date to today
    let dates = [];
    let weeks = [];
    for (let i = lastYearsDate; i <= currentDate; i.setUTCDate(i.getUTCDate() + 1)) {
        weeks.push(new Date(i));
        // add groups of 0-6 to an datesay, every 7th day push full week to dates then reset wek datesay.
        if (i.getUTCDay() === 6) {
            dates.push(weeks);
            weeks = [];
        }
    }
    if (weeks.length > 0) {
        dates.push(weeks)
    }
    console.log(dates)
    return dates;

}

export function createTable() {
    const currentMonth = new Date().toLocaleDateString("en-US", {month: "long"})
    const monthPrefixes = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //loop through array starting from currentMonth, if you reac end of array, go back to beginning until you hit 1 index before starting
    const currentMonthIndex = monthPrefixes.findIndex((month) => month === currentMonth.slice(0,3))
    let monthLabelString = ``
    let i = currentMonthIndex;
    do {
        monthLabelString += `<td class="activity-label" colspan="4">${monthPrefixes[i]}</td>`
        i = (i + 1) % monthPrefixes.length;
    } while(i !== currentMonthIndex)
    let table = `
    <table> 
        <tr> 
        <td class="activity-label"></td>
            ${monthLabelString}
            <td class="activity-label" colspan="4">${monthPrefixes[currentMonthIndex]}</td>
        </tr>`
    let dayMap = {
        1: "Mon",
        3: "Wed",
        5: "Fri" 
    }
    const dates = createDates();
    for (let i = 0; i <= 6; i++) {
        let string = `<tr>`
        if(i in dayMap) string += `<td class="activity-label"><span>${dayMap[i]}</span></td>`;
        else string += `<td class="activity-label"></td>`;
        for (let week of dates) {
            if (!week[i]) continue;
            string += `<td data-activity-level="${week[i].getDay() % 2 ? 3 : week[i].getDay() % 5 ? 0 : 4}" data-date="${week[i].toISOString().split("T")[0]}"></td>`
        }
        string += `</tr>`
        table += string;
    }
    table += `</table>`;
    console.log(dates.length)
    for (let week of dates) console.log(week.length)
    return table;
}
createTable();