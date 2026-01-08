import ToolTip from "./tooltip.js";
import auth from "../auth/auth.js"
import { isEqualDay } from "../utils/date.utils.js"
import ActivityOverview from "../components/activity-overview.js"
import SecretButton from "./secret-button.js"
import Cell from "./Cell.js"
import http from "../http/http.client.js"
import registry from "../ComponentRegistry.js"
import activityCount from "../components/activity-count.js"
import Loader from "../components/loader.js"
function Heatmap() {
    const id = Symbol.for("heatmap")
    let isMounted = false;
    const heatmap = document.querySelector(".heatmap");
    const heatmapContainer = document.querySelector(".heatmap-container")
    const secretButton = SecretButton();
    function mount() {
        (async function loadHeatMap() {
            const { data, error } = await http.get("/heatmap")
            const heatmapHtml = data.html
            heatmap.innerHTML = heatmapHtml;
            isMounted = true;
        })()
        heatmapContainer.addEventListener("changeyear", async (event) => {
            if(registry.didMount(Symbol.for("ActivityOverview"))){
                registry.getMountedComponent(Symbol.for("ActivityOverview")).unmount();
                registry.removeUnmountedComponent(Symbol.for("ActivityOverview"));
            }
            Cell.clearSelectedCells();
            Loader.call(heatmap);
            const year = event.detail.year
            const [heatMapData, activityCountData] = await Promise.all([
                http.get(`/heatmap?selected-year=${year}`),
                http.get(`/activities/count?selected-year=${year}`)
            ]);
            heatmap.innerHTML = heatMapData.data.html

            const count = activityCountData.data.count;
            activityCount.render(count)

        })
        heatmap.addEventListener("mouseover", (event) => {
            const cell = new Cell(event)
            if (!cell.isNull && !cell.isLabel) {
                const tooltip = ToolTip(cell);
                tooltip.mount()
                registry.addMountedComponent(tooltip);
            }

        })
        heatmap.addEventListener("click", async (event) => {
            const cell = new Cell(event)
            if (cell.isNull || cell.isLabel) return;

            const today = new Date()
            today.setHours(0, 0, 0, 0) //set todays date to midnight so the DUMB date library doesnt convert day to tomorrow
    

            if (auth.isAdmin && isEqualDay(cell.date, today)) {
                if (!secretButton.isMounted) {
                    secretButton.mount();
                }
                // Store the selected date for the activity form
                document.getElementById("selected-date").value = cell.date;
            } else {
                if (secretButton.isMounted) {
                    secretButton.unmount();
                }
            }


            if (cell.isSelected) {
                cell.deselect(cell);
                if (registry.didMount(Symbol.for("ActivityOverview"))) {
                    const activityOverview = registry.getMountedComponent(Symbol.for("ActivityOverview"));
                    activityOverview.unmount()
                    registry.removeUnmountedComponent(Symbol.for("ActivityOverview"))
                }
            }
            else {
                Cell.clearSelectedCells();
                cell.select(cell)
                Cell.dimOtherCells();

                const { data, error } = await http.get(`/activities?selected-day=${cell.date}`)

                if (!registry.didMount(Symbol.for("ActivityOverview"))) {
                    const activityOverview = ActivityOverview();
                    activityOverview.mount()
                    activityOverview.render(data);
                    registry.addMountedComponent(activityOverview)
                }
                else {
                    const activityOverview = registry.getMountedComponent(Symbol.for("ActivityOverview"));
                    activityOverview.render(data)
                }

            }
        })
        heatmap.addEventListener("mouseout", (event) => {
            const cell = new Cell(event)
            if (!cell.isNull && !cell.isLabel) {
                const tooltip = registry.getMountedComponent(Symbol.for("Tooltip"));
                tooltip.unmount()
                registry.removeUnmountedComponent(Symbol.for("Tooltip"));
            }
        })
        
    }
    function unmount(){
        heatmap.innerHTML = ""
        isMounted = false;
        registry.removeUnmountedComponent()
    }
    return {
        id,
        mount,
        unmount,
        get isMounted(){
            return isMounted;
        }
    }
}
export default Heatmap