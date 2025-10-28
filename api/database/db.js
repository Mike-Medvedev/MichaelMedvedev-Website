import { DatabaseSync } from "node:sqlite"

class DatabaseManager {
    static #singleton = null;
    static #database = null;
    constructor() { // syntactic sugar over Object.create(DatabaseManager.prototype)
        if (!DatabaseManager.#singleton) {
            DatabaseManager.#singleton = this; //store instance on DatabaseManager.constructor
            DatabaseManager.#database = new DatabaseSync(process.env.DATABASE_CONNECTION_STRING)
        }
        DatabaseManager.seed();
        return DatabaseManager.#singleton
    }
    get instance() {
        return DatabaseManager.#singleton
    }
    get db() {
        return DatabaseManager.#database
    }
    static seed() { // regular method stored as DatabaseManager.prototype.seed
        const database = DatabaseManager.#database;
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
        insert.run("Coding My Website", "coding", "2025-01-27")
        insert.run("Coding My Website", "coding", "2025-01-27")
        insert.run("Coding My Website", "coding", "2025-01-27")
        insert.run("Coding My Website", "coding", "2025-10-26")
        insert.run("Coding My Website", "coding", "2025-10-25")
        insert.run("Coding My Website", "coding", "2025-10-25")
        insert.run("Coding My Website", "coding", "2025-10-25")
        insert.run("Coding My Website", "coding", "2025-09-25")
        insert.run("Coding My Website", "coding", "2025-09-25")
    }

}
const DatabaseManagerSingleton = new DatabaseManager();
export default DatabaseManagerSingleton

