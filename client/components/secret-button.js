

import dialog from "./dialog.js"
import auth from "../auth/auth.js"
import activityOption from "./activity-option.js"
import http from "../http/http.client.js"

function SecretButton() {
    const secretButton = document.querySelector("#secret-button");
    secretButton.hidden = true;
    secretButton.addEventListener("click", async () => {
        if (!auth.isAdmin()) return;

        const { data, error } = await http.get("/activities/options")
        data.forEach(activity => {
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