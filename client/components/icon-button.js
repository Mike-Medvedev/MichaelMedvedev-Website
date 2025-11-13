export default function IconButton(url) {
    function createComponent() {
        const a = document.createElement("a")
        a.target = "_blank";
        a.href = url;
        a.classList.add("icon-button");
        a.classList.add("icon-container")

        const img = document.createElement("img");
        img.src = "https://bumvtrobdabtfwctluzs.supabase.co/storage/v1/object/public/pictures/external-link.svg";
        img.classList.add('icon', 'icon-button-img')

        a.appendChild(img);

        return a

    }
    return { createComponent }
}