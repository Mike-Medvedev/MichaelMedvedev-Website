/**
 * Todo: Implement guitar screen
 */
export default function Guitar(){
    const container = document.createElement("div")
    const text = document.createElement("p");
    text.innerText = "Guitar"
    container.appendChild(text)
    return container
}