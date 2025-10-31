

import dialog from "./dialog.js"
import auth from "../auth/auth.js"
import ActivityOption from "./activity-option.js"
import http from "../http/http.client.js"

export default function SecretButton() {
    const id = Symbol.for("SecretButton");
    let isMounted = false;
    const secretButton = document.querySelector("#secret-button");
    secretButton.hidden = true;

    async function handleClick(){
            if (!auth.isAdmin()) return;
    
            const { data, error } = await http.get("/activities/options")
            data.forEach(activity => {
                ActivityOption(activity).createComponent()
            })
            dialog.open()
    }


    function mount(){
        secretButton.hidden = false
        secretButton.addEventListener("click", handleClick);
        isMounted = true;
    }

    function unmount(){
        secretButton.hidden = true
        secretButton.removeEventListener("click", handleClick)
        isMounted = false;
    }

    return {
        id,
        mount,
        unmount,
        get isMounted(){
            return isMounted;
        }
    }
}