import Home from "./pages/home.js"
import Programming from "./pages/programming.js"
import Guitar from "./pages/guitar.js"
import Snowboarding from "./pages/snowboarding.js"


const BASE_URL = "http://localhost:3000"

const renderMain = function(node){
    const main = document.querySelector("main");
    main.replaceChildren(node);
}


const routes = {
    home: {route: "/", content: Home},
    programming: {route: "/programming", content: Programming},
    guitar: {route: "/guitar", content: Guitar},
    snowboarding: {route: "/snowboarding", content: Snowboarding},
}

//Render main content based on intial pathname. Defaults to home page
function computeInitialRoute(){
    //remove slash from pathname
    const initialPathname= URL.parse(window.location.href)?.pathname.slice(1) ?? "home" 
    let initialContent;
    
    if(initialPathname in routes){
        initialContent = routes[initialPathname].content()
        // push entry url to history
        window.history.pushState({routesKey: initialPathname}, "", `${BASE_URL}`) 
    }
    else { //no routes match pathname, go home
        initialContent = routes["home"].content() 
        window.history.pushState({routesKey: "home"}, "", `${BASE_URL}`)
    }
    
    renderMain(initialContent)
}
computeInitialRoute()





window.addEventListener("popstate", (event) => {
    const routeKey = event.state?.routesKey
    const route = routes[routeKey] || routes["home"];
    const contentToDisplay = route.content()
    renderMain(contentToDisplay)
})

const homeButton = document.querySelector("button#home")
const programmingButton = document.querySelector("button#programming")
const guitarButton = document.querySelector("button#guitar")
const snowboardingButton = document.querySelector("button#snowboarding")

homeButton.addEventListener("click", () => {
    window.history.pushState({routesKey: "home"}, "", `${BASE_URL}`)
    const contentToDisplay = routes["home"].content()
    renderMain(contentToDisplay)
})
programmingButton.addEventListener("click", () => {
    window.history.pushState({routesKey: "programming"}, "", `${BASE_URL}${routes.programming.route}`)
    const contentToDisplay = routes["programming"].content()
    renderMain(contentToDisplay)
})
guitarButton.addEventListener("click", () => {
    window.history.pushState({routesKey: "guitar"}, "", `${BASE_URL}${routes.guitar.route}`)
    const contentToDisplay = routes["guitar"].content()
    renderMain(contentToDisplay)
})
snowboardingButton.addEventListener("click", () => {
    window.history.pushState({routesKey: "snowboarding"}, "", `${BASE_URL}${routes.snowboarding.route}`)
    const contentToDisplay = routes["snowboarding"].content()
    renderMain(contentToDisplay)
})

