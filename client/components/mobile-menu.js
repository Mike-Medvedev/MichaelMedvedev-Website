export default function MobileMenu(){
    function mount(){
        const triggerButton = document.querySelector("#hamburger");
        const rect = triggerButton.getBoundingClientRect();
    
        const menu = document.querySelector(".mobile-menu");
        menu.style.top = rect.bottom + "px";
    }

    return {
        mount
    }
}
