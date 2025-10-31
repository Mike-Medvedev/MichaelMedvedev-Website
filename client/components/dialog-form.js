
import http from "../http/http.client.js"
import dialog from "./dialog.js"
function DialogForm() {
    const id = Symbol.for("DialogForm");
    let isMounted = false;
    const form = document.querySelector(".activity-form")
    const close = document.querySelector("#close");

    async function submitHandler(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const payload = { "title": formData.get("title"), "category": formData.get("category") }
        await http.post("/activities", payload)
        dialog.close()
    }

    function closeDialog() {
        if (!dialog) return;
        dialog.close()
    }

    function mount() {
        form.addEventListener("submit", submitHandler)
        close.addEventListener("click", closeDialog)
    }
    function unmount() {
        form.removeEventListener("submit", submitHandler)
        close.removeEventListener("click", closeDialog)
    }


    return { id, mount, unmount, get isMounted() { return isMounted } }
}
export default DialogForm;