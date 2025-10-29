async function deleteActivity(id) {
    try {
        const response = await fetch(`${window.env.BASE_URL}/activities/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ "id": id }),
            headers: {
                "Content-Type": "application/json"
            }
            
        })
        if (!response.ok) throw new Error("Respone not Ok!")
    } catch (e) {
        throw new Error("Delete Activity error!")
    }


}
export default function DeleteButton(activity){
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "auto";
    deleteButton.style.color = "#AA1111"
    deleteButton.addEventListener("click", () => deleteActivity(activity.id)) //we must remove this eventListener to prevent leak
    return deleteButton;
}