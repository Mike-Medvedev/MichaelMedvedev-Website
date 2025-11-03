import { DatabaseSync } from "node:sqlite"

class DatabaseManagerClass {
    static #singleton = null;
    static #database = null;
    constructor() { // syntactic sugar over Object.create(DatabaseManagerClass.prototype)
        if (!DatabaseManagerClass.#singleton) {
            DatabaseManagerClass.#singleton = this; //store instance on DatabaseManagerClass.constructor
            DatabaseManagerClass.#database = new DatabaseSync(process.env.DATABASE_CONNECTION_STRING)
        }
        DatabaseManagerClass.seed();
        return DatabaseManagerClass.#singleton
    }
    static get instance() {
        return DatabaseManagerClass.#singleton
    }
    get db() {
        return DatabaseManagerClass.#database
    }
    static seed() { // regular method stored as DatabaseManagerClass.prototype.seed
        const database = DatabaseManagerClass.#database;
        database.exec(` CREATE TABLE activities (
            id INTEGER PRIMARY KEY,
            title TEXT,
            category TEXT,
            date TEXT
            ) STRICT`);
        const insert = database.prepare(`
            INSERT INTO activities
            (title, category, date)
            VALUES (?, ?, ?)
        `)
        // insert.run("Coding My Website", "coding", "2025-01-27")
        // insert.run("Coding My Website", "coding", "2025-01-27")
        // insert.run("Coding My Website", "coding", "2025-01-27")
        // insert.run("Coding My Website", "coding", "2025-10-26")
        // insert.run("Coding My Website", "coding", "2025-10-25")
        // insert.run("Coding My Website", "coding", "2025-10-25")
        // insert.run("Coding My Website", "coding", "2025-10-25")
        // insert.run("Coding My Website", "coding", "2025-09-25")
        // insert.run("Coding My Website", "coding", "2025-09-25")
    }

}
const DatabaseManager = new DatabaseManagerClass();
export default DatabaseManager

