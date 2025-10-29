function ActivityOption(){
    const select = document.querySelector("#activity-options");
    if (!select) return;
    function render(text){
        const option = document.createElement("option")
            option.textContent = text.charAt(0).toUpperCase() + text.slice(1);
            select.appendChild(option)
    }
    return { render }
}
const activityOption = ActivityOption()
export default activityOption