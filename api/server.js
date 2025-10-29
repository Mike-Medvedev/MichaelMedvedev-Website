import express from "express"
import path from "path"
import ActivityRouter from "./controllers/Activity.controller.js"
import AuthRouter from "./controllers/Auth.controller.js"
import HeatmapRouter from "./controllers/Heatmap.controller.js"
import logger from "./middleware/logger.middleware.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger)

app.use('/activities', ActivityRouter);
app.use('/auth', AuthRouter);
app.use('/heatmap', HeatmapRouter);



//process.cwd is where node process started from (root dir)
app.use(express.static(path.join(process.cwd(), "client")))



app.get("/", (req, res) => {
    res.send("Hello World!")
})

//{*splat} is express v5 catchall route
app.get("/{*splat}", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "client", "index.html"))
})

app.listen(process.env.PORT, '0.0.0.0', () => { console.log(`server listening on port ${process.env.PORT}`) })