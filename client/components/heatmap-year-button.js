export default function HeatMapYearButtons() {
    const heatmapButtons = document.querySelectorAll("#heatmap-year-button");
    function createComponent() {
        heatmapButtons.forEach((button) => {
            button.addEventListener("click", function () {
                if(button.classList.contains("selected")){return;}
                heatmapButtons.forEach((b) => {
                    if (b !== button) b.classList.remove("selected");
                  });
                button.classList.toggle("selected");
                const event = new CustomEvent("changeyear", {
                    bubbles: true,
                    detail: { year: button.dataset.year }
                });
                this.dispatchEvent(event);
            }
            )
        })
    }
    return { createComponent }
}