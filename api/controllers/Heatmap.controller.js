import express from "express"
import renderHeatMap from "../heatmap.js"

const HeatmapRouter = express.Router();

HeatmapRouter.get("/", async (req, res) => {
    const heatmapHtml = await renderHeatMap()
    res.status(200).json({html: heatmapHtml});
})

export default HeatmapRouter