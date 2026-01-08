import Category from "./Category.js";
import Title from "./Title.js";
import ActivityDate from "./ActivityDate.js";
import Link from "./Link.js";
export default class Activity {
  #title;
  #category;
  #date;
  #link;
  constructor(title, category, link, date) {
    this.#title = new Title(title);
    this.#category = new Category(category);
    this.#link = new Link(link);
    this.#date = new ActivityDate(date || this.#getTodayDateString());
    Object.freeze(this); // make immutable
  }
  #getTodayDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  get title() {
    return this.#title.value;
  }
  get category() {
    return this.#category.value;
  }
  get date() {
    return this.#date.value;
  }
  get link() {
    return this.#link.value;
  }
  modelDump() {
    return {
      title: this.#title.value,
      category: this.#category.value,
      date: this.#date.value,
      link: this.#link.value,
    };
  }
}
