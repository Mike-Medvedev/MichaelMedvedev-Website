/**
 * Javascript Entry point
 * Renders Dynamic Content
 * Registers Event Listeners
 * Fetches Data from server
 */

import "./router.js"

const monthSuffix = {
    0: "th",
    1: "st",
    2: "nd",
    3: "rd",
    4: "th",
    5: "th",
    6: "th",
    7: "th",
    8: "th",
    9: "th",
}
Object.freeze(monthSuffix)

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
        if(cell.classList.contains("activity-label"))return;
        cell.classList.add("active-tooltip");
        const cellDate = new Date(cell.getAttribute("data-date")) //the actual day
        const rect = heatmap.getBoundingClientRect();
        const heatmapMidpoint = (rect.width / 2) + rect.left;
        if(event.clientX > heatmapMidpoint){
            cell.classList.add("tooltip-right")
            cell.classList.remove("tooltip-left")
        }
        else{
            cell.classList.add("tooltip-left")
            cell.classList.remove("tooltip-right")
        } 
        // dont convert to localTime, because data-date is UTC
        cell.setAttribute("data-activities", `No Activities on ${cellDate.toLocaleDateString("en-US", {month: "long", timeZone: "UTC"})} ${cellDate.getUTCDate()}${monthSuffix[cellDate.getUTCDate() % 10]}`) //%10 gets last digit
    })
    heatmap.addEventListener("click", async (event) => {

        const currentScrollTop = document.documentElement.scrollTop
        const cell = event.target.closest("td");
        if(!cell) return;
        if(cell.classList.contains("activity-label"))return;
        const previousSelectedCells = heatmap.querySelectorAll("td[selected='true']:not(.activity-label)");
        const activityOverview = document.querySelector(".activity-overview")
        const activityContainer = document.querySelector(".activities")
        const cellDate = cell.getAttribute("data-date");
        if(cell.getAttribute("selected")){ //when selecting previously selected cell
            cell.removeAttribute("selected");
            document.querySelectorAll('td:not(.activity-label)').forEach(td => {
                td.style.backgroundColor = `oklch(from ${window.getComputedStyle(td)['backgroundColor']} l c h / 1)`
            });
            return;
        }
        else{ //when selecting different cell
            if(previousSelectedCells.length > 0){
                previousSelectedCells.forEach(prevCell => {
                    prevCell.removeAttribute("selected");
                    
                })
            }

            cell.setAttribute("selected", "true");
            console.log(window.getComputedStyle(cell)['backgroundColor'])
            document.querySelectorAll('td:not([selected="true"]):not(.activity-label)').forEach(td => {
                td.style.backgroundColor = `oklch(from ${window.getComputedStyle(td)['backgroundColor']} l c h / 0.5)`
            });
            document.querySelectorAll('td[selected="true"]:not(.activity-label)').forEach(td => {
                td.style.backgroundColor = `oklch(from ${window.getComputedStyle(td)['backgroundColor']} l c h / 1)`
            });
            activityOverview.style.display = "block";
            const response = await fetch(`http://localhost:3000/activity?selected-day=${cellDate}`);
            const result = await response.json();
            const activityDateElement = document.querySelector(".activity-date")
            const activityDate = new Date(result.date)
            activityDateElement.innerText = `${activityDate.toLocaleDateString("en-US", {month: "long"})} ${activityDate.getDate()}, ${activityDate.getFullYear()}`
            const activityHtml = result.activities.map(activity => {
                const container = document.createElement("div")
                container.classList.add("activity");

                const categoryIndicator = document.createElement("span")
                categoryIndicator.classList.add("category", activity.category)

                const title = document.createElement("div");
                title.innerText = activity.title;
                title.classList.add("mr-1");


                container.append(categoryIndicator, title);
                return container;
            })

            const activityLegend = document.createElement("div");
            activityLegend.classList.add("activity-legend");

            const categoryItems = Array.from(["Coding", "Reading", "Fitness"]).map(category => {
                const categoryItem = document.createElement("span");
                categoryItem.classList.add("category-item");
                categoryItem.innerText = category;
                categoryItem.setAttribute("size", "small")
                return categoryItem;
            })
           

            activityLegend.append(...categoryItems);
            activityContainer.replaceChildren(...activityHtml, activityLegend);
        }
        document.documentElement.scroll({top: currentScrollTop})
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = event.target.closest("td");
        if(!cell ) return;
        cell.classList.remove("active-tooltip");
    })
});

