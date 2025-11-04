export default function Loader(){
    const container = document.createElement("div");
    container.classList.add("loader-container");

    const loader = document.createElement("div");
    loader.classList.add("loader");

    container.appendChild(loader);

    this.replaceChildren(container);
}
