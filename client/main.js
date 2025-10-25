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
    heatmap.addEventListener("click", async (event) => {
        const cell = event.target.closest("td");
        const activityOverview = document.querySelector(".activity-overview")
        if(!cell) return;
        if(cell.getAttribute("selected")){ 
            cell.removeAttribute("selected");
            activityOverview.style.display = "none";
            return;
        }
        cell.setAttribute("selected", "true");
        activityOverview.style.display = "block";
        const cellDate = cell.getAttribute("data-date");
        const response = await fetch(`http://localhost:3000/activity?selected-day=${cellDate}`);
        const result = await response.json();
        console.log(result);
        const activityContainer = document.querySelector(".activity")
        for(let activity of result.activities){
            const p = document.createElement("p")
            p.innerText = activity;
            p.classList.add("mr-1");
            activityContainer.appendChild(p)
        }
        
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = event.target.closest("td");
        if(!cell) return;
        cell.classList.remove("active-tooltip");
    })
});