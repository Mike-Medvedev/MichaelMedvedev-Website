import express from "express"
const ActivityRouter = express.Router();
import Activity from "../models/activity/Activity.js"
import ActivityService from "../services/Activity.service.js"
import Category from "../models/activity/Category.js"

ActivityRouter.get("/", async (req, res) => {
    const selectedDay = req.query["selected-day"];
    if(!selectedDay) res.sendStatus(400)
    const entry = await ActivityService.getByDate(selectedDay)
    return res.json(entry.modelDump())

})

ActivityRouter.post("/", async (req, res) => {
    const {title, category} = req.body
    const newActivity = new Activity(title, category)
    const createdId = await ActivityService.create(newActivity);
    res.status(201).send(createdId)
})

ActivityRouter.delete("/:id", function(req, res) {
    const {id} = req.params
    ActivityService.deleteById(id)
    res.status(200).json({"ok": "ok"})
})

ActivityRouter.get("/options", (req, res) => {
    res.json(Category.categories)
})

ActivityRouter.get("/count", async(req, res) => {
    const count = await ActivityService.getCount();
    res.json(count)
})

export default ActivityRouter

