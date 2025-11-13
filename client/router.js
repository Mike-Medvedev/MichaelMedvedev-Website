import { getCurrentPathname } from "./utils/path.utils.js";

function Router() {
    const pages = document.querySelectorAll("main");
    const navLinks = document.querySelectorAll("nav a[data-route]");

    function togglePage(route){
        pages.forEach((page) => {
            page.hidden = page.id !== route;
        });
        navLinks.forEach((link) => {
            link.classList.toggle("selected", link.getAttribute("data-route") === route);
        });
    };

    function navigate(route){
        if (getCurrentPathname() === route) return;
        window.history.pushState({ routesKey: route }, "", route);
        togglePage(route);
    };

    function setupNavigation(){
        togglePage(window.location.pathname);
        navLinks.forEach((link) => {
            const route = link.getAttribute("data-route");
            link.addEventListener("click", (e) => {
                e.preventDefault();
                navigate(route);
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
