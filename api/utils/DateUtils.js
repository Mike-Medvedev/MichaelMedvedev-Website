export default class DateUtils{
    static trimTime(date){
        const clone = new Date(date)
        return clone.toISOString().split("T")[0]
    }
    static isDate(date){
        return date instanceof Date;
    }
    static isTimelessDateString(dateString){
        if (typeof dateString !== 'string') {
            return false;
        }
        // check if date matches YYYY-MM-DD format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }
        const date = new Date(dateString + 'T00:00:00.000Z');
        return this.trimTime(date) === dateString;
    }
    static findFirstDayOfWeek(date){
        let firstDayOfWeek = new Date(date)
        const dayOfWeek = firstDayOfWeek.getUTCDay();
        firstDayOfWeek.setUTCDate(firstDayOfWeek.getUTCDate() - dayOfWeek)
        return firstDayOfWeek;
    }
    static getDateOneYearAgo(currentDate){
        let lastYearsDate = new Date();
        lastYearsDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
        lastYearsDate = DateUtils.findFirstDayOfWeek(lastYearsDate);
        lastYearsDate.setUTCHours(0, 0, 0, 0);
        return lastYearsDate
    }
}