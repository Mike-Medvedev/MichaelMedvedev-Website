import ActivityLegend from "./activity-legend.js"
import CreateActivity from "./activity.js"
export default function ActivityOverview(result){
    const activityOverview = document.querySelector(".activity-overview")
    const activityContainer = document.querySelector(".activities")
    const activityDateElement = document.querySelector(".activity-date")
    const activityDate = new Date(result.date)
    activityDateElement.innerText = `${activityDate.toLocaleDateString("en-US", { month: "long" })} ${activityDate.getUTCDate()}, ${activityDate.getFullYear()}`

    const activityHtml = result.activities.map(activity => CreateActivity(activity))
    const activityLegend = ActivityLegend()
        
    activityContainer.replaceChildren(...activityHtml, activityLegend);

    function show(){
        activityOverview.style.display = "block";
        activityContainer.replaceChildren(...activityHtml, activityLegend);
    }

    return {
        show,
        hide: () => {activityOverview.style.display = "none"}
    }
}