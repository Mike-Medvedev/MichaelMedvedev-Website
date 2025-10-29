import DatabaseManager from "../database/db.js"
export class ActivityRepository{
    #db;
    constructor(){
        this.#db = DatabaseManager.db;
    }


}