export default class DeleteActivity {
    #id;
    constructor(id) {
        this.#id = id
    }
    get id() {
        return this.#id
    }
    modelDump() {
        return [this.#id]
    }
}
