
import http from "../http/http.client.js"
import dialog from "./dialog.js"
function DialogForm(){
    const form = document.querySelector(".activity-form")
    const close = document.querySelector("#close");

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const payload = {"title": formData.get("title"), "category": formData.get("category")}
        await http.post("/activities", payload)
        dialog.close()
    })

    close.addEventListener("click", () => {
        if (!dialog) return;
        dialog.close()
    })
}
const dialogForm = DialogForm()
export default dialogForm;