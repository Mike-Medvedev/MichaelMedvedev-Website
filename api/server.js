import express from "express"
import path from "path"
import * as functions from "./functions.js"
import { DatabaseSync } from "node:sqlite"
const app = express()

console.log("Connecting to In-Memory Db...")
const database = new DatabaseSync(':memory:');
console.log("Connected to DB")

console.log("Creating Activities Table...");
database.exec(`
    CREATE TABLE activities(
      id INTEGER PRIMARY KEY,
      title TEXT,
      category TEXT,
      date TEXT
    ) STRICT
  `);
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

const CategoryEnum = ["coding", "reading", "fitness", "music"]
Object.freeze(CategoryEnum)

// Object.prototype.modelDump = function(){

// }

class Activity {
    #title;
    #category;
    #date;
    constructor(title, category) {
        this.#title = title;
        this.#category = category;
        this.#date = new Date().toISOString().split('T')[0];  // for example "2025-01-27", removing time
    }
    get title() {
        return this.#title
    }
    set title(value) {
        if (typeof value !== "string") throw new Error("Title must be a string");
        this.#title = value
    }
    get category() {
        return this.#category;
    }
    set category(value) {
        if (typeof value !== "string") throw new Error("Category must be a string");
        if (!(CategoryEnum.includes(value.toLowerCase().trim()))) throw new Error(`Category must be ${CategoryEnum.join(", ")} Recieved: ${value}`)
        this.#category = value
    }
    get date() {
        return this.#date;
    }
    modelDump() {
        return [this.#title, this.#category, this.#date] //convert to UTC string
    }
}
Object.seal(Activity.prototype)


class PublicActivity extends Activity {
    #id;
    constructor(id, title, category) {
        super(title, category) //does not inherit, but delegates lookups of these props, up prototype chain
        this.#id = id
    }
    get id() {
        return this.#id
    }
    set id(value) {
        if (typeof value !== "number") {
            throw new Error(`Activity Type Id must be a number. Recieved ${value}`);
        }
        this.#id = value
    }
}
Object.seal(PublicActivity.prototype)

class GetActivitiesReq {
    #date;
    #activities
    constructor(date, activities = []) {
        this.#date = date;
        this.#activities = activities
        Object.freeze(this.#activities) // (shallow freeze) underlying object since arrays are objects in js
    }
    get date() {
        return this.#date;
    }
    set date(value) {
        console.error("Cannot set; Date is readonly")
        return undefined;
    }
    get activities() {
        return this.#activities
    }
    set activities(value) {
        console.error("Cannot set; Activites are readonly")
        return undefined;
    }
}
app.use(express.urlencoded({extended: true}))
app.use(express.json())


const logger = function (req, res, next) {
    console.log("Recieved Request from: ", req.host + req.url)
    next();
}

app.use(logger)

//process.cwd is where node process started from (root dir)
app.use(express.static(path.join(process.cwd(), "client")))

const PORT = 3000


app.get("/heatmap", (req, res) => {
    const heatmapHtml = functions.createTable(database);
    res.status(200).send(heatmapHtml);
    // get current day and a year before today
    // get activites for each day in that range 
    // generate table rows for each day (sunday 2024 - sunday 2025, saturday 2024 - saturday 2025)
    // each column is one week, so iterator over each week, and for each week, get a day
    // one uyear of milliseconds = 1000 * 60 * 60 * 24 * 365
    // i can get the last year by making a new date and doing .setFullyear()
})


app.post("/", (req, res) => {
    res.status(200).send("OK")
})

app.get("/activity", (req, res) => {
    const selectedDay = req.query["selected-day"];
    if(!selectedDay) res.json({})
    if(selectedDay === "all"){
        const selectAll = database.prepare(`
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

app.post("/activity", (req, res) => {
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

app.delete("/activity", (req, res) => {
    const {id} = req.body

    const deleteQuery = database.prepare(`
        DELETE FROM activities
        WHERE id = ?
        `)
    deleteQuery.run(id)

    res.sendStatus(200)
})

app.post("/token", (req, res) => {
    if(req.headers["authorization"] === "bearer 12345b67"){
        res.sendStatus(200)
    }
    else res.sendStatus(401)
})
app.get("/activity-options", (req, res) => {
    res.json(CategoryEnum)
})

//{*splat} is express v5 catchall route
app.get("/{*splat}", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "client", "index.html"))
})

app.listen(PORT, '0.0.0.0', () => { console.log(`server listening on port ${PORT}`) })