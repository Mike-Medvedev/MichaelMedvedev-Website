import express from "express"
import path from "path"
const app = express()

app.use(express.json())

const logger = function(req, res, next){
    console.log("Recieved Request from: ", req.host + req.url)
    next();
}

app.use(logger)

//process.cwd is where node process started from (root dir)
app.use(express.static(path.join(process.cwd(), "client"))) 

const PORT = 3000

//{*splat} is express v5 catchall route
app.get("/{*splat}", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "client", "index.html"))
})

app.post("/", (req, res) => {
    res.status(200).send("OK")
})

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)})