export default class Cell{
    #isLabel = false;
    isNull = false;
    #date;
    #selected;
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
        this.#selected = this.cell.getAttribute("selected");
    }
    select(){
        this.cell.setAttribute("selected", "true");
    }
    deselect(cell){
        this.cell.removeAttribute("selected");
        document.querySelectorAll('td:not(.activity-label)').forEach(td => {
            td.style.filter = '';
        });
    }
    clearSelectedCells(){
        const previousSelectedCells = document.querySelectorAll("td[selected='true']:not(.activity-label)");
        previousSelectedCells.forEach(prev => prev.removeAttribute("selected"))
    }

    dimOtherCells(){
        document.querySelectorAll('td:not([selected="true"]):not(.activity-label)').forEach(td => {
            td.style.filter = 'brightness(0.9)'
        });
        
    }
    get isLabel(){
        return this.#isLabel;
    }
    get date(){
        return this.#date;
    }
    isSelected(){
        return this.#selected;
    }

}