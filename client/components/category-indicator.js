export default function CategoryIndicator(activity){
    function createComponent(){
        const categoryIndicator = document.createElement("span")
        categoryIndicator.classList.add("category-indicator")
        categoryIndicator.setAttribute("category", activity.category.toLowerCase())
        categoryIndicator.setAttribute("size", "medium");
        return categoryIndicator;
    }
    return { createComponent }
}