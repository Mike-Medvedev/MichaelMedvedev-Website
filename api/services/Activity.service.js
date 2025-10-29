

import ActivityDate from "../models/activity/ActivityDate.js"
import ActivityEntry from "../models/activity/ActivitiesEntry.js"
import PublicActivity from "../models/activity/PublicActivity.js"
import DatabaseManager from "../database/db.js"
import DateUtils from "../utils/DateUtils.js"
class ActivityServiceClass {
    static #instance = null;
    constructor() {
        if (!ActivityServiceClass.#instance) {
            ActivityServiceClass.#instance = this;
            console.log("NO INSTANCE YET, MAKING NOW")
        }
        console.log("RETURNING PREVIOUS INSTANCE")
        return ActivityServiceClass.#instance;
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
    getByRange(startDay, endDay) {
        const allActivities = DatabaseManager.db.prepare(`
            SELECT date, COUNT(*) as count FROM activities
            WHERE date >= ? 
            AND date <= ?
            GROUP BY date
            `)
            const d1 = DateUtils.trimTime(startDay)
            const d2 = DateUtils.trimTime(endDay)
            const results = allActivities.all(d1, d2); //[{date: "2025-05-05", count: 5}, {date: "2025-05-06", count: 7}]
            return results;
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
        try{
            const deleteQuery = DatabaseManager.db.prepare(`
                DELETE FROM activities
                WHERE id = ?
                `)
            deleteQuery.run(id)
        } catch(e){
            throw new Error(e)
        }
        
    }

}
const ActivityService = new ActivityServiceClass();
export default ActivityService