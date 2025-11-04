export function trimTime(date){
    const clone = new Date(date)
    return clone.toISOString().split("T")[0]
}

export function isEqualDay(date1, date2){
    return trimTime(new Date(date1)) === trimTime(new Date(date2))
}

export function toLocalISO(date){
    const localIso = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
      ].join("-");
      return localIso;
}