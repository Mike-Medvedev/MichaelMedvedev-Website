import StringUtils from "../../utils/StringUtils.js"
export default class Category{
    static #categories = ["coding", "reading", "fitness", "music"];
    #category = null;
    constructor(category){
        if(Category.#categories.includes(StringUtils.clean(category))){
            this.#category = category;
            Object.freeze(this); // make this Object instance immutable
        }
        else {
            throw new Error(`Input ${category} is not a valid Category!`)
        }
    }
    get value(){
        return this.#category
    }
    static get categories(){
        return Category.#categories
    }
}