export default function MobileMenu(){
    const triggerButton = document.querySelector("#hamburger");
    const rect = triggerButton.getBoundingClientRect();

    console.log(rect)

    const menu = document.querySelector(".mobile-menu");
    console.log(menu)
    menu.style.top = rect.bottom + "px";

}