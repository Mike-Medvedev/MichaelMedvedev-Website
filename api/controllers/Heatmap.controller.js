import express from "express"
import renderHeatMap from "../heatmap.js"

const HeatmapRouter = express.Router();

HeatmapRouter.get("/", (req, res) => {
    const heatmapHtml = renderHeatMap()
    res.status(200).json({html: heatmapHtml});
})

export default HeatmapRouter