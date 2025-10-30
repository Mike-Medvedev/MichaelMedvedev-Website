import { getCurrentPathname } from "./utils/path-utils.js";

function Router() {
    const pages = document.querySelectorAll("main");
    const navButtons = document.querySelectorAll("nav button");

    function togglePage(route){
        pages.forEach((page) => {
            page.hidden = page.id !== route;
        });
        navButtons.forEach((button) => {
            button.classList.toggle("active", button.id === route);
        });
    };

    function navigate(route){
        if (getCurrentPathname() === route) return;
        window.history.pushState({ routesKey: route }, "", route);
        togglePage(route);
    };

    function setupNavigation(){
        togglePage(window.location.pathname);
        navButtons.forEach((button) => {
            const route = button.id;
            button.addEventListener("click", () => {
                navigate(route)
            });
        });
        window.addEventListener("popstate", (event) => {
            const route = event.state?.routesKey || window.location.pathname;
            togglePage(route);
        });
    };

    return { setupNavigation };
}

const router = Router();
export default router;
