import StringUtils from "../../utils/StringUtils.js"
export default class Title{
    #title;
    constructor(title){
        if(typeof title !== "string") throw new Error("Title must be of type string");
        this.#title = StringUtils.clean(title);

        Object.freeze(this); //make value object immutable
    }
    get value(){
        return this.#title
    }
}