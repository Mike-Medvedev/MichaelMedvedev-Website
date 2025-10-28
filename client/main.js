/**
 * Javascript Entry point
 * Renders Dynamic Content
 * Registers Event Listeners
 * Fetches Data from server
 */

import "./router.js"
import "./custom-tooltip.js"

const BASE_URL = "http://192.168.1.207:3000"
let isAdmin = false;

const categories = ["coding", "reading", "fitness", "music"];

const secretButton = document.querySelector("#secret-button");
secretButton.hidden = true;
const dialog = document.querySelector("dialog");
async function deleteActivity(id) {
    try {
        const response = await fetch(`${BASE_URL}/activity`, {
            method: "DELETE",
            body: JSON.stringify({ "id": id }),
            headers: {
                "Content-Type": "application/json"
            }
            
        })
        if (!response.ok) throw new Error("Respone not Ok!")
    } catch (e) {
        throw new Error("Delete Activity error!")
    }


}

secretButton.addEventListener("click", async () => {
    if (!isAdmin) return;
    const response = await fetch(`${BASE_URL}/activity-options`);
    const result = await response.json();
    console.log(result);
    const select = document.querySelector("#activity-options");
    if (!select) return;
    result.forEach(activity => {
        const option = document.createElement("option")
        option.textContent = activity.charAt(0).toUpperCase() + activity.slice(1);
        select.appendChild(option)
    })
    dialog.showModal()
});

const form = document.querySelector(".activity-form")

const close = document.querySelector("#close");
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    for (let [key, value] of formData) {
        console.log(key, value)
    }
    try {
        const response = await fetch(`${BASE_URL}/activity`, {
            method: "POST",
            body: JSON.stringify({ "title": formData.get("title"), "category": formData.get("category") }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (!response.ok) throw new Error("Response not ok")
            dialog.close()
    } catch (e) {
        throw new Error(e)
    }


})


close.addEventListener("click", () => {
    if (!dialog) return;
    dialog.close()
})
const token = localStorage.getItem("token")
async function validateUser() {
    const response = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
    if (response.ok) {
        isAdmin = true;
    }
}
validateUser()
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

async function loadHeatMap() {
    try {
        console.log("Loading HeatMap...")
        const heatmapHtmlResponse = await fetch(`${BASE_URL}/heatmap`);
        const heatmapHtml = await heatmapHtmlResponse.text();
        console.log("Successfully Fetched Heatmap")
        const heatmap = document.querySelector(".heatmap")
        heatmap.innerHTML = heatmapHtml;
    } catch (e) {
        throw new Error(e)
    }

}
loadHeatMap().then(() => {
    const heatmap = document.querySelector("table");
    heatmap.addEventListener("mouseover", (event) => {
        const cell = event.target.closest("td");
        if (!cell) return;
        if (cell.classList.contains("activity-label")) return;
        const cellDate = cell.getAttribute("data-date") //I.E '2025-07-08'
        const tooltip = document.querySelector(`custom-tooltip[for="${cellDate}"]`);
        if (!tooltip) return;

        const rect = cell.getBoundingClientRect();
        const offsetY = 30;
        const spaceRight = window.innerWidth - rect.right
        const spaceLeft = rect.left;
        let offsetX = 72;
        if (spaceRight < 120) offsetX = 145;
        if (spaceLeft < 120) offsetX = 0;

        tooltip.style.setProperty("--font-size", "12px");
        tooltip.style.setProperty("--border-radius", "4px");
        tooltip.style.setProperty("--background-color", "oklch(.551 .027 264.364)")
        tooltip.style.setProperty("--font-color", "white")
        tooltip.style.setProperty("--tooltip-left", `${rect.left - offsetX}px`)
        tooltip.style.setProperty("--tooltip-top", `${rect.top + window.scrollY - offsetY}px`)
        tooltip.showPopover();
    })
    heatmap.addEventListener("click", async (event) => {
        const cell = event.target.closest("td");
        if (!cell) return;
        if (cell.classList.contains("activity-label")) return;
        const previousSelectedCells = heatmap.querySelectorAll("td[selected='true']:not(.activity-label)");
        const activityOverview = document.querySelector(".activity-overview")
        const activityContainer = document.querySelector(".activities")
        const cellDate = cell.getAttribute("data-date");
        const isSameDay = cellDate === new Date().toISOString().split("T")[0]
        secretButton.hidden = !(isAdmin && isSameDay)


        if (cell.getAttribute("selected")) { //when selecting previously selected cell
            cell.removeAttribute("selected");
            document.querySelectorAll('td:not(.activity-label)').forEach(td => {
                td.style.filter = '';
            });
            return;
        }
        else { //when selecting different cell
            if (previousSelectedCells.length > 0) {
                previousSelectedCells.forEach(prevCell => {
                    prevCell.removeAttribute("selected");

                })
            }

            cell.setAttribute("selected", "true");
            document.querySelectorAll('td:not([selected="true"]):not(.activity-label)').forEach(td => {
                td.style.filter = 'brightness(0.8)'
            });
            document.querySelectorAll('td[selected="true"]:not(.activity-label)').forEach(td => {
                td.style.filter = 'brightness(1.5)';
            });
            activityOverview.style.display = "block";

            const response = await fetch(`${BASE_URL}/activity?selected-day=${cellDate}`);
            const result = await response.json();
            const activityDateElement = document.querySelector(".activity-date")
            const activityDate = new Date(result.date)
            activityDateElement.innerText = `${activityDate.toLocaleDateString("en-US", { month: "long" })} ${activityDate.getUTCDate()}, ${activityDate.getFullYear()}`
            const activityHtml = result.activities.map(activity => {
                const container = document.createElement("div")
                container.classList.add("activity");

                const categoryIndicator = document.createElement("span")
                console.log("printing cateogries", activity.category)
                categoryIndicator.classList.add("category")
                categoryIndicator.setAttribute("category", activity.category.toLowerCase())

                const title = document.createElement("div");
                title.innerText = activity.title;
                title.classList.add("mr-1");



                container.append(categoryIndicator, title);

                if (isAdmin && isSameDay) {
                    const deleteButton = document.createElement("button")
                    deleteButton.textContent = "Delete";
                    deleteButton.style.marginLeft = "auto";
                    deleteButton.style.color = "#AA1111"
                    deleteButton.addEventListener("click", () => deleteActivity(activity.id))
                    container.appendChild(deleteButton)
                }

                return container;
            })

            const activityLegend = document.createElement("div");
            activityLegend.classList.add("activity-legend");

            const categoryItems = categories.map((category) => {
                const categoryItem = document.createElement("span");
                categoryItem.classList.add("category-item");
                categoryItem.setAttribute("category", category)
                categoryItem.innerText = category;
                categoryItem.setAttribute("size", "small")
                return categoryItem;
            })


            activityLegend.append(...categoryItems);
            activityContainer.replaceChildren(...activityHtml, activityLegend);
        }
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = event.target.closest("td");
        if (!cell) return;
        const cellDate = cell.getAttribute("data-date") //the actual day
        const tooltip = document.querySelector(`custom-tooltip[for="${cellDate}"]`);
        if (!tooltip) return;
        tooltip.hidePopover();
    })
});

