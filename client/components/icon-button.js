export default function IconButton(url) {
    function createComponent() {
        const a = document.createElement("a")
        a.target = "_blank";
        a.href = url;
        a.classList.add("icon-button");
        a.classList.add("icon-container")

        const img = document.createElement("img");
        img.src = "../assets/external-link.svg";
        img.classList.add('icon', 'icon-button-img')

        a.appendChild(img);

        return a

    }
    return { createComponent }
}