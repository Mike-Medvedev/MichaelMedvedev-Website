import DateUtils from "../../utils/DateUtils.js"
import Category from "./Category.js"
import Title from "./Title.js"
import ActivityDate from "./ActivityDate.js"
import Link from "./Link.js"
export default class Activity {
    #title;
    #category;
    #date;
    #link;
    constructor(title, category, link) {
        this.#title = new Title(title);
        this.#category = new Category(category);
        this.#link = new Link(link);
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
    get link() {
        return this.#link.value
    }
    modelDump() {
        return { title: this.#title.value, category: this.#category.value, date: this.#date.value, link: this.#link.value }
    }
}