function createDates(){
    let currentDate = new Date();
    let lastYearsDate = new Date();
    lastYearsDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
    // starting on last years date, store that day in an datesay and then add one to that day

    //loop through everyday from last years date to today
    let dates = [];
    let weeks = [];
   for(let i = lastYearsDate; i <= currentDate ; i.setUTCDate(i.getUTCDate() + 1)){
    weeks.push(new Date(i));
    // add groups of 0-6 to an datesay, every 7th day push full week to dates then reset wek datesay.
    if(i.getUTCDay() === 6)  {
        dates.push(weeks);
        weeks = [];
    }
   }
   if(weeks.length > 0){
    dates.push(weeks)
    }
   console.log(dates)
   return dates;
    
}

export function createTable(){
    let table = `<table>`
    
    const dates = createDates();
    for(let i = 0; i <= 6; i++){
        let string = `<tr>`
        for(let week of dates){
            if(!week[i]) continue;
            string += `<td>${week[i]}</td>`
        }
        string += `</tr>`
        table += string;
    }
    table += + `</table>`;
    return table;
}
