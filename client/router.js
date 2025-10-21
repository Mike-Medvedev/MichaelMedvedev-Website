import Home from "./pages/home.js"
import Programming from "./pages/programming.js"
import Guitar from "./pages/guitar.js"
import Snowboarding from "./pages/snowboarding.js"


const BASE_URL = "http://localhost:3000"
const routes = {
    home: {route: "/", content: Home},
    programming: {route: "/programming", content: Programming},
    guitar: {route: "/guitar", content: Guitar},
    snowboarding: {route: "/snowboarding", content: Snowboarding},
}

const router = window.history
console.log(router)
window.addEventListener("popstate", (event) => {
    const routeKey = event.state.routesKey
    const contentToDisplay = routes[routeKey].content()
    renderMain(contentToDisplay)
})

const homeButton = document.querySelector("button#home")
const programmingButton = document.querySelector("button#programming")
const guitarButton = document.querySelector("button#guitar")
const snowboardingButton = document.querySelector("button#snowboarding")

homeButton.addEventListener("click", () => {
    router.pushState({routesKey: "home"}, "", `${BASE_URL}`)
    const contentToDisplay = routes["home"].content()
    renderMain(contentToDisplay)
})
programmingButton.addEventListener("click", () => {
    router.pushState({routesKey: "programming"}, "", `${BASE_URL}/programming`)
    const contentToDisplay = routes["programming"].content()
    renderMain(contentToDisplay)
})
guitarButton.addEventListener("click", () => {
    router.pushState({routesKey: "guitar"}, "", `${BASE_URL}/guitar`)
    const contentToDisplay = routes["guitar"].content()
    renderMain(contentToDisplay)
})
snowboardingButton.addEventListener("click", () => {
    router.pushState({routesKey: "snowboarding"}, "", `${BASE_URL}/snowboarding`)
    const contentToDisplay = routes["snowboarding"].content()
    renderMain(contentToDisplay)
})

const renderMain = function(node){
    const main = document.querySelector("main");
    main.replaceChildren(node);
}