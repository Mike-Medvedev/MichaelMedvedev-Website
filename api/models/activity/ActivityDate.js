import DateUtils from "../../utils/DateUtils.js"
export default class ActivityDate{
    #date;
    constructor(date){
        if(! DateUtils.isTimelessDateString(date)) throw new Error('Activity Date must be of format "YYYY-MM-DD"');
        this.#date = date

        Object.freeze(this); //make value object immutable
    }
    get value(){
        return this.#date
    }
}