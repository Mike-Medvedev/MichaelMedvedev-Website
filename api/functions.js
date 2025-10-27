function findFirstDayOfWeek(date){
    const firstDayOfWeek = new Date(date);
    const dayOfWeek = firstDayOfWeek.getUTCDay();
    firstDayOfWeek.setUTCDate(firstDayOfWeek.getUTCDate() - dayOfWeek)
    return firstDayOfWeek;
}
function createDates() {
    let currentDate = new Date()
    currentDate.setUTCHours(0, 0, 0, 0);
    let lastYearsDate = new Date();
    lastYearsDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
    lastYearsDate = findFirstDayOfWeek(lastYearsDate);
    // starting on last years date, store that day in an datesay and then add one to that day
    lastYearsDate.setUTCHours(0, 0, 0, 0);

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
    return dates;

}

export function createTable(database) {
    const dates = createDates();
    const firstDay = dates.flat(1)[0];
    const lastDay = dates.flat(1)[dates.flat(1).length - 1]
    const currentMonth = new Date().toLocaleDateString("en-US", {month: "long"})
    const monthPrefixes = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    console.log("first day: ", firstDay, "last day: ", lastDay)
    const allActivities = database.prepare(`
        SELECT date, COUNT(*) as count FROM activities
        WHERE date >= ? 
        AND date <= ?
        GROUP BY date
        `)
    let activityLevelMap = allActivities.all(firstDay.toISOString().split("T")[0], lastDay.toISOString().split("T")[0]); //[{date: "2025-05-05", count: 5}]
    const a = {}
    Object.values(activityLevelMap).forEach(d => a[d.date] = d.count)
    console.log(a)

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
    
    for (let i = 0; i <= 6; i++) {
        let string = `<tr>`
        if(i in dayMap) string += `<td class="activity-label"><span>${dayMap[i]}</span></td>`;
        else string += `<td class="activity-label"></td>`;
        for (let week of dates) {
            if (!week[i]) continue;
            console.log(week[i])
            string += `<td data-activity-level="${a[week[i].toISOString().split("T")[0]] || 0}" data-date="${week[i].toISOString().split("T")[0]}"></td>`
        }
        string += `</tr>`
        table += string;
    }
    table += `</table>`;
    return table;
}