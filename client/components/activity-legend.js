import {CATEGORIES} from "../constants.js"
export default function ActiviyLegend(){
    const activityLegend = document.createElement("div");
    activityLegend.classList.add("activity-legend");

    const categoryItems = CATEGORIES.map((category) => {
        const container = document.createElement("div");
        container.classList.add("flex", "align-center");
        const text = document.createTextNode("category")
        const categoryIndicator = document.createElement("div");
        categoryIndicator.classList.add("category-indicator");
        categoryIndicator.setAttribute("category", category)
        categoryIndicator.setAttribute("size", "small")

        container.append(categoryIndicator, text)

        return container;
    })


    activityLegend.append(...categoryItems);

    return activityLegend
}