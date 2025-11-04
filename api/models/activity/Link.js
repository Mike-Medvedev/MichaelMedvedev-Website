export default class Link{
    #value;
    constructor(link){
        const isValidLink = Link.validateURL(link)
        if(!isValidLink) return null;
        this.#value = link;
        Object.freeze(this)
    }
    get value(){
        return this.#value;
    }
    static validateURL(link){
        const valid = URL.canParse(link);
        return !!valid;
    }
}