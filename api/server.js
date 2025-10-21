import express from "express"
const app = express()

app.use(express.json())

const logger = function(req, res, next){
    console.log("Recieved Request from: ", req.host + req.url)
    // console.log("Ip Address of user is: ", req.ip)
    next();
}
app.use(logger)
app.use(express.static(process.cwd())) // serve from current working directy where node process started from

const PORT = 3000

app.get("/", (req, res) => {
    res.status(200).send("Ok")
})

app.post("/", (req, res) => {
    res.status(200).send("OK")
})

app.listen(PORT, () => {console.log(`server listening on port ${PORT}`)})