import express from "express"
import path from "path"
import * as functions from "./functions.js"
const app = express()

const CategoryEnum = ["Coding", "Reading", "Fitness", "Music"]
Object.freeze(CategoryEnum)

function ActivityType(title, category){
    Object.defineProperties(this, {
        "title": {
            get(){
               return this._title 
            },
            set(value){
                if(typeof value != "string") throw new Error("Title must be a string")
                this._title = value
            }
        },
        "category": {
            get(){
                return this._category;
            },
            set(value){
                if(typeof value != "string") throw new Error("Category must be a string")
                if(!(value in CategoryEnum)) throw new Error(`Category must be ${CategoryEnum.join(", ")}`)
                this._category = value
            }
        }
    })
    this.title = title;
    this.category = category
   
}
Object.seal(ActivityType)


app.use(express.json())

const logger = function(req, res, next){
    console.log("Recieved Request from: ", req.host + req.url)
    next();
}

app.use(logger)

//process.cwd is where node process started from (root dir)
app.use(express.static(path.join(process.cwd(), "client"))) 

const PORT = 3000


app.get("/heatmap", (req, res) => {
    const heatmapHtml = functions.createTable();
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
    const selectedDay = new Date(req.query["selected-day"]);
    if(selectedDay.getTime() == new Date("2024-10-27").getTime()){
        res.json({"date": req.query["selected-day"], "activities": [{title: "Read a book about stuff", category: "coding"}]})
    }
    else {
        res.json({"date": req.query["selected-day"], "activities": [{title: "You Dont Know JS: Chapters 1 - 2", category: "coding"}, {title: "Reading About CSS Responsiveness",  category: "coding"}, {title: "Ran 19 miles", category: "fitness"}] })
    }
    
})

//{*splat} is express v5 catchall route
app.get("/{*splat}", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "client", "index.html"))
})

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)})