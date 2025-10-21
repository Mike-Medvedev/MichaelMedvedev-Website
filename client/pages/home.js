/**
 * Todo: Implement home screen
 */

export default function Home(){
    const container = document.createElement("div")
    const text = document.createElement("p");
    text.innerText = "Home"
    container.appendChild(text)
    return container
}