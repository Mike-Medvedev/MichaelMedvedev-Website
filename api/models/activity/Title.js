export default class Title{
    #title;
    constructor(title){
        if(typeof title !== "string") throw new Error("Title must be of type string");
        this.#title = title.trim()

        Object.freeze(this); //make value object immutable
    }
    get value(){
        return this.#title
    }
}