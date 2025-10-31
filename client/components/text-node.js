export default function TextNode(text){
    function createComponent(){
        const node = document.createElement("div");
        node.innerText = text;
        return node;
    }
    return { createComponent }
}