/**
 * Javascript Entry point
 * Renders Dynamic Content
 * Registers Event Listeners
 * Fetches Data from server
 */

import "./router.js"

async function loadHeatMap(){
    const heatmapHtmlResponse = await fetch("http://localhost:3000/heatmap");
    const heatmapHtml = await heatmapHtmlResponse.text();
    const heatmap = document.querySelector(".heatmap")
    heatmap.innerHTML = heatmapHtml;
}
loadHeatMap().then(() => {
    const heatmap = document.querySelector("table");
    heatmap.addEventListener("mouseover", (event) => {
        const cell = event.target.closest("td");
        if(!cell) return;
        cell.classList.add("active-tooltip");
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = event.target.closest("td");
        if(!cell) return;
        cell.classList.remove("active-tooltip");
    })
});