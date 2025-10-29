


function DialogForm(){
    const form = document.querySelector(".activity-form")
    const close = document.querySelector("#close");

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        try {
            const response = await fetch(`${window.env.BASE_URL}/activities`, {
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
}
const dialogForm = DialogForm()
export default dialogForm;