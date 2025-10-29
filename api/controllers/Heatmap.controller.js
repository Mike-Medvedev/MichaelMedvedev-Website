import express from "express"
import renderHeatMap from "../heatmap.js"

const HeatmapRouter = express.Router();

HeatmapRouter.get("/", (req, res) => {
    const heatmapHtml = renderHeatMap()
    res.status(200).send(heatmapHtml);
})


export default HeatmapRouter