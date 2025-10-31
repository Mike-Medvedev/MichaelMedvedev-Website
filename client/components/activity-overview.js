import Activity from "./activity.js"

//Server Side Rendered Component
//Hydrates .activity-overview

export default function ActivityOverview(){
    const id = Symbol.for("ActivityOverview");
    let isMounted = false;
    const activityOverview = document.querySelector(".activity-overview")
    const activityContainer = document.querySelector(".activities")
    const activityDateElement = document.querySelector(".activity-date")

    function render(result){
        const activityDate = new Date(result.date)
        activityDateElement.innerText = `${activityDate.toLocaleDateString("en-US", { month: "long" })} ${activityDate.getUTCDate()}, ${activityDate.getFullYear()}`
        const activities = result.activities.map(activity => {
            activity.date = result.date //quick patch for development
            return Activity(activity).createComponent()
        })
        activityContainer.replaceChildren(...activities);
    }
    function mount(){
        activityOverview.style.display = "block";
        isMounted = true;
    }
    function unmount(){
        activityOverview.style.display = "none"
        isMounted = false;
    }

    return {
        id,
        mount,
        unmount,
        render,
        get isMounted(){
            return isMounted;
        }
    }
}