export default function ActivityOption(text){
    const select = document.querySelector("#activity-options");
    if (!select) return;
    function createComponent(){
        const option = document.createElement("option")
            option.textContent = text.charAt(0).toUpperCase() + text.slice(1);
            select.appendChild(option)
    }
    return { createComponent }
}