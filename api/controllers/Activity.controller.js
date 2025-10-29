import express from "express"
const ActivityRouter = express.Router();
import Activity from "../models/activity/Activity.js"
import ActivityService from "../services/Activity.service.js"

ActivityRouter.get("/", (req, res) => {
    const selectedDay = req.query["selected-day"];
    if(!selectedDay) res.sendStatus(400)
    
    const entry = ActivityService.getByDate(selectedDay)
    return res.json(entry.modelDump())

})


ActivityRouter.post("/", (req, res) => {
    const {title, category} = req.body
    const newActivity = new Activity(title, category)

    const createdId = ActivityService.create(newActivity);

    res.status(201).send(createdId)
})

ActivityRouter.delete("/:id", function(req, res) {
    const {id} = req.body

    const deleteQuery = this.db.prepare(`
        DELETE FROM activities
        WHERE id = ?
        `)
    deleteQuery.run(id)

    res.sendStatus(200)
})

ActivityRouter.get("/options", (req, res) => {
    res.json(CategoryEnum)
})



export default ActivityRouter

