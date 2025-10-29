import {CATEGORIES} from "../constants.js"
export default function ActiviyLegend(){
    const activityLegend = document.createElement("div");
    activityLegend.classList.add("activity-legend");

    const categoryItems = CATEGORIES.map((category) => {
        const categoryItem = document.createElement("span");
        categoryItem.classList.add("category-item");
        categoryItem.setAttribute("category", category)
        categoryItem.innerText = category;
        categoryItem.setAttribute("size", "small")
        return categoryItem;
    })


    activityLegend.append(...categoryItems);

    return activityLegend
}