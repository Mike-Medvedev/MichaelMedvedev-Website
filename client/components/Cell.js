export default class Cell{
    #isLabel = false;
    isNull = false;
    #date;
    constructor(event){
        this.cell = event.target.closest("td");
        if(!this.cell) {
            this.isNull = true;
            return;
        }
        if (this.cell.classList.contains("activity-label")){
            this.#isLabel = true;
        }
        this.rect = this.cell.getBoundingClientRect()
        this.#date = this.cell.getAttribute("data-date");
    }
    select(){
        this.cell.setAttribute("selected", "true");
        this.cell.classList.remove("dim")
    }
    deselect(cell){
        this.cell.removeAttribute("selected");
        document.querySelectorAll('td:not(.activity-label)').forEach(td => {
            td.classList.remove("dim");
        });
    }
    clearSelectedCells(){
        const previousSelectedCells = document.querySelectorAll("td[selected='true']:not(.activity-label)");
        previousSelectedCells.forEach(prev => prev.removeAttribute("selected"))
    }

    dimOtherCells(){
        document.querySelectorAll("td:not(.activity-label):not([selected='true'])")
                .forEach(td => td.classList.add("dim"));
        
    }
    get isLabel(){
        return this.#isLabel;
    }
    get date(){
        return this.#date;
    }
    get isSelected(){
        return this.cell.hasAttribute("selected");
    }

}