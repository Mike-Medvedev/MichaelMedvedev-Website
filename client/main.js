import router from "./router.js"
import "./web-components/custom-tooltip.js"
import "./config.js"
import Heatmap from "./components/heatmap.js"


router.setupNavigation();
Heatmap().mount();
