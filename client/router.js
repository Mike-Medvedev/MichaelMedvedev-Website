const BASE_URL = "http://localhost:3000"
const routes = {
    home: "/",
    programming: "/programming",
    guitar: "/guitar",
    snowboarding: "/snowboarding"
}
const pages = document.querySelectorAll("main");

function toggleActivePage(pageToActivate){
    if(pageToActivate === "/") pageToActivate = "home";
    else if(pageToActivate.startsWith("/")) pageToActivate = pageToActivate.slice(1);
    pages.forEach(page => page.hidden = page.id !== pageToActivate);
}


{
    let initialPathname= URL.parse(window.location.href)?.pathname.slice(1) ?? "home";
    if(!(initialPathname in routes)) initialPathname = "home";
    toggleActivePage(initialPathname);
}




window.addEventListener("popstate", (event) => {
    const routeKey = event.state?.routesKey
    const route = routes[routeKey] || routes["home"];
    toggleActivePage(route)
})

const homeButton = document.querySelector("button#home")
const programmingButton = document.querySelector("button#programming")
const guitarButton = document.querySelector("button#guitar")
const snowboardingButton = document.querySelector("button#snowboarding")

homeButton.addEventListener("click", () => {
    if(URL.parse(window.location.href)?.pathname === routes.home) return;
    window.history.pushState({routesKey: routes.home}, "", `${BASE_URL}`);
    toggleActivePage(routes.home)
})
programmingButton.addEventListener("click", () => {
    if(URL.parse(window.location.href)?.pathname === routes.programming) return;
    window.history.pushState({routesKey: routes.programming}, "", `${BASE_URL}${routes.programming}`)
    toggleActivePage(routes.programming);
})
guitarButton.addEventListener("click", () => {
    if(URL.parse(window.location.href)?.pathname === routes.guitar) return;
    window.history.pushState({routesKey: routes.guitar}, "", `${BASE_URL}${routes.guitar}`)
    toggleActivePage(routes.guitar);
})
snowboardingButton.addEventListener("click", () => {
    if(URL.parse(window.location.href)?.pathname === routes.snowboarding) return;
    window.history.pushState({routesKey: routes.snowboarding}, "", `${BASE_URL}${routes.snowboarding}`)
    toggleActivePage(routes.snowboarding);
})

