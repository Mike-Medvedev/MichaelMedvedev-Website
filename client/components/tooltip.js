function ToolTip(cell){
    const id = Symbol.for("Tooltip")
    let isMounted = false;
    const tooltip = document.querySelector(`custom-tooltip[for="${cell.date}"]`);
    if (!tooltip) return;
    function mount(){
        const rect = cell.rect;
        const offsetY = 30;
        const spaceRight = window.innerWidth - rect.right
        const spaceLeft = rect.left;
        let offsetX = 72;
        if (spaceRight < 120) offsetX = 145;
        if (spaceLeft < 120) offsetX = 0;

        tooltip.style.setProperty("--font-size", "12px");
        tooltip.style.setProperty("--border-radius", "4px");
        tooltip.style.setProperty("--background-color", "oklch(.551 .027 264.364)")
        tooltip.style.setProperty("--font-color", "white")
        tooltip.style.setProperty("--tooltip-left", `${rect.left - offsetX}px`)
        tooltip.style.setProperty("--tooltip-top", `${rect.top + window.scrollY - offsetY}px`)

        tooltip.showPopover()
        isMounted = true;
    }
    function unmount(){
        tooltip.hidePopover()
        isMounted = true;
    }
    
    return { id, mount, unmount, get isMounted(){ return isMounted } }
}
export default ToolTip