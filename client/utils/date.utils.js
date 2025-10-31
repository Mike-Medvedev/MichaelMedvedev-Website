export function trimTime(date){
    const clone = new Date(date)
    return clone.toISOString().split("T")[0]
}

export function isEqualDay(date1, date2){
    return trimTime(new Date(date1)) === trimTime(new Date(date2))
}