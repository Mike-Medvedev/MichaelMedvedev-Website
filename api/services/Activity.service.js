

import ActivityDate from "../models/activity/ActivityDate.js"
import ActivityEntry from "../models/activity/ActivitiesEntry.js"
import PublicActivity from "../models/activity/PublicActivity.js"
import DatabaseManager from "../database/db.js"
class ActivityServiceClass {
    static #instance = null;
    constructor() {
        if (!ActivityServiceClass.#instance) {
            ActivityServiceClass.#instance = this;
        }
        return ActivityServiceClass.#instance;
    }
    getById(id) {

    }
    getByDate(date) {
        const selectedDate = new ActivityDate(date).value
        const entry = new ActivityEntry(selectedDate);

        const query = DatabaseManager.db.prepare(`
            SELECT * FROM activities
            WHERE date = ?`
        )
        const result = query.all(selectedDate)
        
        for (let activity of result) {
            const newActivity = new PublicActivity(activity.id, activity.title, activity.category)
            entry.add(newActivity)
        }

        return entry
    }
    getByRange(date1, date2) {

    }
    getByYear(year) {

    }
    create(activity) {
        try {
            const insert = DatabaseManager.db.prepare(`
            INSERT INTO activities
            (title, category, date)
            VALUES (?, ?, ?)
            `)
            const {title, category, date} = activity.modelDump()
            const obj = insert.run(title, category, date)
            
            return obj.lastInsertRowid
        } catch (e) {
            throw new Error(e)
        }
    }
    deleteById(id) {

    }

}
const ActivityService = new ActivityServiceClass();
export default ActivityService