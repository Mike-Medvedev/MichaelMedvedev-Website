import router from "./router.js"
import "./web-components/custom-tooltip.js"
import "./config.js"
import Heatmap from "./components/heatmap.js"
import HeatMapYearButtons from "./components/heatmap-year-button.js"

router.setupNavigation();
Heatmap().mount();
HeatMapYearButtons().createComponent()