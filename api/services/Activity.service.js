

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
        }
        return ActivityServiceClass.#instance;
    }
    async getByDate(date) {
        const selectedDate = new ActivityDate(date).value
        const entry = new ActivityEntry(selectedDate);

        const { data, error } = await DatabaseManager.db
        .from("activities")
        .select()
        .eq('date', selectedDate)

        for (let activity of data) {
            const newActivity = new PublicActivity(activity.id, activity.title, activity.category)
            entry.add(newActivity)
        }
        return entry
    }
    async getByRange(startDay, endDay) {
        const d1 = DateUtils.trimTime(startDay);
        const d2 = DateUtils.trimTime(endDay);

        const { data, error } = await DatabaseManager.db
            .from('activities')
            .select('date, date.count()')
            .gte('date', d1)
            .lte('date', d2);

        if (error) console.error(error);
        return data;
    }
    async getCount(){

        const { count } = await DatabaseManager.db
        .from("activities")
        .select('*', { count: 'exact' })
        .gte('date', '2025-01-01')
        .lt('date', '2026-01-01');

        return { count };
    }
    async create(activity) {

        const { title, category, date } = activity.modelDump()

        console.log(activity.modelDump())

        const { data, error } = await DatabaseManager.db
        .from('activities')
        .insert([
            { title, category, date }
        ])
        .select('id');
        
        if(error) {console.error(error)}
        console.log(data);

        return data
    }
    async deleteById(id) {

        const { data, error } =  await DatabaseManager.db
        .from("activities")
        .delete()
        .eq('id', id)
        
        if(error) console.error(error)
        
    }

}
const ActivityService = new ActivityServiceClass();
export default ActivityService