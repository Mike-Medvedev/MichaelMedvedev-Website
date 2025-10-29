function ToolTip(cell){
    const tooltip = document.querySelector(`custom-tooltip[for="${cell.date}"]`);
    if (!tooltip) return;

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

    

    return {
        show: () => tooltip.showPopover(),
        hide: () => tooltip.hidePopover()
    }
}
export default ToolTip