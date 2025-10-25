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
        if(!cell) return;
        //when a cell is selected, remove other selected cells and their content.
        // fetch data for selected cell, set current cell attribute selected to true, add dom elements


        const previousSelectedCells = heatmap.querySelectorAll("td[selected='true']");
        const activityOverview = document.querySelector(".activity-overview")
        const activityContainer = document.querySelector(".activity")

        if(cell.getAttribute("selected")){ //when selecting previously selected cell
            cell.removeAttribute("selected");
            activityOverview.style.display = "none";
            const pElements = activityContainer.querySelectorAll("p");
            pElements.forEach(p => p.remove());
            return;
        }
        else{ //when selecting different cell
            if(previousSelectedCells.length > 0){
                previousSelectedCells.forEach(cell => {
                    cell.removeAttribute("selected");
                })
            }

            cell.setAttribute("selected", "true");
            activityOverview.style.display = "block";
            const cellDate = cell.getAttribute("data-date");
            const response = await fetch(`http://localhost:3000/activity?selected-day=${cellDate}`);
            const result = await response.json();
            console.log(result);
            
            for(let activity of result.activities){
                const p = document.createElement("p")
                p.innerText = activity;
                p.classList.add("mr-1");
                activityContainer.appendChild(p)
            }
        }
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = event.target.closest("td");
        if(!cell) return;
        cell.classList.remove("active-tooltip");
    })
});