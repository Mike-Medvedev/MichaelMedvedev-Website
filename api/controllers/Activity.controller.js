import express from "express"
const ActivityRouter = express.Router();


ActivityRouter.get("/:id", function(req, res){
    const selectedDay = req.query["selected-day"];
    if(!selectedDay) res.json({})
    if(selectedDay === "all"){
        const selectAll = this.db.prepare(`
            SELECT * FROM activities`)
        const activities = selectAll.all();
        console.log(activities)
        return res.json({date: new Date(), activities})
    }
    
    const select = database.prepare(`
        SELECT * FROM activities
        WHERE date = ?`)
    
    const activities = select.all(selectedDay)
    return res.json({
        date: selectedDay,
        activities: activities
    })

})


ActivityRouter.post("/:id", function(req, res) {
    const {title, category} = req.body
    try {

        const newActivity = new Activity(title, category)
        console.log(...newActivity.modelDump())
        const insert = database.prepare(`
        INSERT INTO activities
        (title, category, date)
        VALUES (?, ?, ?)
        `)
        const obj = insert.run(...newActivity.modelDump())
        console.log("Printing last row id: ", obj.lastInsertRowid)
        res.json(newActivity)
    } catch (e) {
        throw new Error(e)
    }
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