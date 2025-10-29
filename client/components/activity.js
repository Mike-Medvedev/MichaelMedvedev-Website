import auth from "../auth/auth.js"
import DeleteButton from "./delete-button.js"
import {isEqualDay} from "../utils/date-utils.js"

export default function CreateActivity(activity){
    const container = document.createElement("div")
    container.classList.add("activity");

    const categoryIndicator = document.createElement("span")
    categoryIndicator.classList.add("category")
    categoryIndicator.setAttribute("category", activity.category.toLowerCase())

    const title = document.createElement("div");
    title.innerText = activity.title;
    title.classList.add("mr-1");

    container.append(categoryIndicator, title);

    if (auth.isAdmin() && isEqualDay(activity.date, new Date())) {
        const deleteButton = DeleteButton(activity)
        container.appendChild(deleteButton)
    }

    return container
}