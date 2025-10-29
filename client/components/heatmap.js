import ToolTip from "./tooltip.js";
import auth from "../auth/auth.js"
import {isEqualDay} from "../utils/date-utils.js"
import ActivityOverview from "../components/activity-overview.js"
import secretButton from "./secret-button.js"
import Cell from "./Cell.js"
function HeatMap(){
    const heatmap = document.querySelector(".heatmap");
    (async function loadHeatMap() {
        try {
            const heatmapHtmlResponse = await fetch(`${window.env.BASE_URL}/heatmap`);
            const heatmapHtml = await heatmapHtmlResponse.text();
            heatmap.innerHTML = heatmapHtml;
        } catch (e) {
            throw new Error(e)
        }
    
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
        if(auth.isAdmin && isEqualDay(cell.date, today)){
            secretButton.show()
        }


        if (cell.isSelected()) {
            cell.deselect(cell);
        }
        else { 
            cell.clearSelectedCells();
            cell.select(cell)
            cell.dimOtherCells()

            const response = await fetch(`${window.env.BASE_URL}/activities?selected-day=${cell.date}`);
            const result = await response.json();
            
            ActivityOverview(result).show();
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