import http from "../http/http.client.js"

async function Auth() {
    let validated = false;
    
    const { data, error } = await http.get("/auth/token");
    validated = !error && data?.ok === true;

    return { get isAdmin(){ return validated } }
}

const auth = await Auth();

const signInForm = document.querySelector("#admin-sign-in-form");
const signInError = document.querySelector("#admin-sign-in-error");
const signedIn = document.querySelector("#admin-signed-in");

signInForm.hidden = auth.isAdmin;
signedIn.hidden = !auth.isAdmin;

document.querySelector("#admin-sign-out").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.assign("/");
});

signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = signInForm.elements.token.value;
    try {
        const response = await fetch(`${window.env.BASE_URL}/auth/token`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok || !(await response.json()).ok) throw new Error("Invalid token");
        localStorage.setItem("token", token);
        location.assign("/");
    } catch {
        signInError.hidden = false;
    }
});

export default auth;
