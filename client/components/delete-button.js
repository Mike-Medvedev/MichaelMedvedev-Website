import http from "../http/http.client.js"

async function deleteActivity(id) {
    const { data, error } = await http.delete(`/activities/${id}`)
    return !!data

}
export default function DeleteButton(activity) {
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "auto";
    deleteButton.style.color = "#AA1111"
    deleteButton.addEventListener("click", () => deleteActivity(activity.id)) //we must remove this eventListener to prevent leak
    return deleteButton;
}