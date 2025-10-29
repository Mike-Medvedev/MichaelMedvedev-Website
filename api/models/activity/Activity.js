import DateUtils from "../../utils/DateUtils.js"
import Category from "./Category.js"
import Title from "./Title.js"
import ActivityDate from "./ActivityDate.js"
export default class Activity {
    #title;
    #category;
    #date;
    constructor(title, category) {
        this.#title = new Title(title)
        this.#category = new Category(category);
        this.#date = new ActivityDate(DateUtils.trimTime(new Date()))
        Object.freeze(this) // make immutable
    }
    get title() {
        return this.#title.value
    }
    get category() {
        return this.#category.value;
    }
    get date() {
        return this.#date.value;
    }
    modelDump() {
        return [this.#title.value, this.#category.value, this.#date.value]
    }
}