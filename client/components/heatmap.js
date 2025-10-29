import ToolTip from "./tooltip.js";
import auth from "../auth/auth.js"
import {isEqualDay} from "../utils/date-utils.js"
import ActivityOverview from "../components/activity-overview.js"
import secretButton from "./secret-button.js"
import Cell from "./Cell.js"
import http from "../http/http.client.js"
function HeatMap(){
    const heatmap = document.querySelector(".heatmap");
    (async function loadHeatMap() {
            const { data, error } = await http.get("/heatmap")
            const heatmapHtml = data.html
            heatmap.innerHTML = heatmapHtml;
    
    })()
    heatmap.addEventListener("mouseover", (event) => {
        const cell = new Cell(event)
        if (!cell.isNull && !cell.isLabel) {
            ToolTip(cell).show()
        }
        
    })
    heatmap.addEventListener("click", async (event) => {
        const cell = new Cell(event)
        if (cell.isNull || cell.isLabel) return;
       

        const today = new Date()
        if(auth.isAdmin() && isEqualDay(cell.date, today)){
            secretButton.show()
        }


        if (cell.isSelected()) {
            cell.deselect(cell);
        }
        else { 
            cell.clearSelectedCells();
            cell.select(cell)
            cell.dimOtherCells()

            const { data, error } = await http.get(`/activities?selected-day=${cell.date}`)
            ActivityOverview(data).show();
        }
    })
    heatmap.addEventListener("mouseout", (event) => {
        const cell = new Cell(event)
        if (!cell.isNull && !cell.isLabel) {
            ToolTip(cell).hide()
        }
    })
}
const heatMap = HeatMap();
export default heatMap