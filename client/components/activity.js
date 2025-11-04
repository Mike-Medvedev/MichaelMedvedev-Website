import auth from "../auth/auth.js"
import DeleteButton from "./delete-button.js"
import CategoryIndicator from "./category-indicator.js"
import {isEqualDay} from "../utils/date.utils.js"
import TextNode from "./text-node.js"
import { capitalize } from "../utils/string.utils.js"
import IconButton from "./icon-button.js"

export default function Activity(activity){
    function createComponent(){
        const container = document.createElement("div")
        container.classList.add("activity");
        const categoryIndicator = CategoryIndicator(activity).createComponent()
        const activityTitle = TextNode(capitalize(activity.title)).createComponent()

        container.append(categoryIndicator, activityTitle);
 
        if(activity.link){
            const linkButton = IconButton(activity.link).createComponent();
            linkButton.style.marginLeft = "auto";
            container.append(linkButton)
        }

        if (auth.isAdmin && isEqualDay(activity.date, new Date())) {
            const deleteButton = DeleteButton(activity).createComponent()
            container.appendChild(deleteButton)
        }
        return container;
    }

    return { createComponent }
}