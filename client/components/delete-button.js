import http from "../http/http.client.js"

async function deleteActivity(id) {
    const { data, error } = await http.delete(`/activities/${id}`)
    return !!data

}
export default function DeleteButton(activity){  //creates dom component 
    function createComponent() {
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "auto";
        deleteButton.style.color = "#AA1111"
        deleteButton.addEventListener("click", () => deleteActivity(activity.id), { once: true }) //removes after used once.
        return deleteButton;
    }
    return { createComponent }
}