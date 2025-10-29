class DateUtils{
    // removes time: 2025-10-28T23:17:32.260Z -> 2025-10-28
    static trimTime(date){
        const clone = new Date(date)
        return clone.toISOString().split("T")[0]
    }
}