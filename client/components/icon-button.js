export default function IconButton(url) {
    function createComponent() {
        const a = document.createElement("a")
        a.target = "_blank";
        try {
            const parsed = new URL(url);
            if (parsed.protocol === "http:" || parsed.protocol === "https:") a.href = parsed.href;
        } catch {
            // Do not turn invalid stored links into executable URLs.
        }
        a.rel = "noopener noreferrer";
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
