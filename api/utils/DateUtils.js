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
        
        // Check if it matches YYYY-MM-DD format using regex
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            return false;
        }
        
        // Parse the date and check if it's valid
        const date = new Date(dateString + 'T00:00:00.000Z');
        return this.trimTime(date) === dateString;
    }
    static findFirstDayOfWeek(date){
        let firstDayOfWeek = new Date(date)
        const dayOfWeek = firstDayOfWeek.getUTCDay();
        currDate.setUTCDate(firstDayOfWeek.getUTCDate() - dayOfWeek)
        return firstDayOfWeek;
    }
    static getDateOneYearAgo(){
        let lastYearsDate = new Date();
        lastYearsDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
        lastYearsDate = DateUtils.findFirstDayOfWeek(lastYearsDate); //set date to first day of week a year ago
        lastYearsDate.setUTCHours(0, 0, 0, 0);
    }
}