import { generateHeatMapYearButtons } from "../utils/date.utils.js";
export default function HeatMapYearButtons() {
  const heatmapButtonContainer = document.querySelector(".button-stack");
  console.log("YO THIS IS BUTTON STACK CONTAINER", heatmapButtonContainer);
  function createComponent() {
    const heatmapButtons = generateHeatMapYearButtons();

    heatmapButtons.forEach((button) => {
      heatmapButtonContainer.append(button);
      button.addEventListener("click", function () {
        if (button.classList.contains("selected")) {
          return;
        }
        heatmapButtons.forEach((b) => {
          if (b !== button) b.classList.remove("selected");
        });
        button.classList.toggle("selected");
        const event = new CustomEvent("changeyear", {
          bubbles: true,
          detail: { year: button.dataset.year },
        });
        this.dispatchEvent(event);
      });
    });
  }
  return { createComponent };
}
