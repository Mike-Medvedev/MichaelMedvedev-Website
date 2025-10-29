import express from "express"

const HeatmapRouter = express.Router();

HeatmapRouter.get("/", (req, res) => {
    const heatmapHtml = functions.createTable(database);
    res.status(200).send(heatmapHtml);
    // get current day and a year before today
    // get activites for each day in that range 
    // generate table rows for each day (sunday 2024 - sunday 2025, saturday 2024 - saturday 2025)
    // each column is one week, so iterator over each week, and for each week, get a day
    // one uyear of milliseconds = 1000 * 60 * 60 * 24 * 365
    // i can get the last year by making a new date and doing .setFullyear()
})


export default HeatmapRouter