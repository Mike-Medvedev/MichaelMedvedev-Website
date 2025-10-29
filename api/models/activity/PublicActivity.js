import Activity from "./Activity.js"

export default class PublicActivity extends Activity {
    #id;
    constructor(id, title, category) {
        super(title, category) //does not inherit, but delegates lookups of these props, up prototype chain
        this.#id = id
    }
    get id() {
        return this.#id
    }
    modelDump() {
        return [this.#id, ...super.modelDump()]
    }
}
