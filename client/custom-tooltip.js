class CustomToolTip extends HTMLElement {
    constructor(){
        super();

    }
    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        const span = document.createElement("span");
        span.innerText = this.getAttribute("text") || "I am a tooltip! Override me!";
        shadow.appendChild(span);

        const template = document.querySelector("#custom-tooltip-template")?.content
        if(template){
            shadow.appendChild(template.cloneNode(true))
        }
    

        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(`
        :host{
            --tooltip-left: 0px;
            --tooltip-top: 0px;
            --background-color: #ffffff;
            --border: none;
            --border-width: 0px;
            --border-style: solid;
            --border-color: transparent;
            --border-radius: 0px;
            --font-size: 1rem;
            --font-color: #000000;
            --opacity: 1;
            position: absolute;
            width: fit-content;
            top: var(--tooltip-top, 0px);
            left: var(--tooltip-left, 0px);
            background-color: var(--background-color, #ffffff);
            border: var(--border-width, 0px) var(--border-style, solid) var(--border-color, transparent);
            border-radius: var(--border-radius, 0px);
            text-wrap: nowrap;
            padding-inline: 0.5rem;
            padding-block: 0.25rem;
            font-size: var(--font-size, 1rem);
            color: var(--font-color, #000000);
            opacity: var(--opacity, 1);
        }
            `)
        shadow.adoptedStyleSheets = [stylesheet]
    }
}
customElements.define("custom-tooltip", CustomToolTip)