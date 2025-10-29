

import dialog from "./dialog.js"
import auth from "../auth/auth.js"
import activityOption from "./activity-option.js"

// secretButton.hidden = !(isAdmin && isSameDay) // used in heatmap event listenr

function SecretButton(){
    const secretButton = document.querySelector("#secret-button");
    secretButton.hidden = true;
    secretButton.addEventListener("click", async () => {
        if (!auth.isAdmin()) return;
        const response = await fetch(`${window.env.BASE_URL}/activities/options`);
        const result = await response.json();
        result.forEach(activity => {
            activityOption.render(activity)
        })
        dialog.open()
    });
    return {
        show: () => secretButton.hidden = false,
        hide: () => secretButton.hidden = true
    }
}
const secretButton = SecretButton()
export default secretButton