import { createClient } from '@supabase/supabase-js'

class DatabaseManagerClass {
    static #singleton = null;
    static #database = null;
    static async init() { // syntactic sugar over Object.create(DatabaseManagerClass.prototype)
        if (!DatabaseManagerClass.#singleton) {
            DatabaseManagerClass.#singleton = new DatabaseManagerClass(); //store instance on DatabaseManagerClass.constructor
            DatabaseManagerClass.#database = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
        }
        // await DatabaseManagerClass.seed();
        return DatabaseManagerClass.#singleton
    }
    static get instance() {
        return DatabaseManagerClass.#singleton
    }
    get db() {
        return DatabaseManagerClass.#database
    }
    static async seed() { // regular method stored as DatabaseManagerClass.prototype.seed
        const { error } = await this.#database.from("activities").insert([
            {title: "Coding My Website", category: "coding", date: "2025-09-25"},
            {title: "Coding My Website", category: "coding", date: "2025-09-24"},
            {title: "Coding My Website", category: "coding", date: "2025-09-23"}
        ])
        const { data } = await this.#database.from("activities").select()

    }

}
const DatabaseManager = await DatabaseManagerClass.init();
export default DatabaseManager

