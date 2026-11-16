import http from "../http/http.client.js"

async function Auth() {
    let validated = false;
    
    const { data, error } = await http.get("/auth/token");
    validated = !error && data?.ok === true;

    return { get isAdmin(){ return validated } }
}

const auth = await Auth();

const signInButton = document.querySelector("#admin-sign-in");
const signInDialog = document.querySelector("#admin-sign-in-dialog");
const signInForm = document.querySelector("#admin-sign-in-form");
const signInError = document.querySelector("#admin-sign-in-error");

if (auth.isAdmin) signInButton.textContent = "Admin sign out";

signInButton.addEventListener("click", () => {
    if (auth.isAdmin) {
        localStorage.removeItem("token");
        location.reload();
    } else {
        signInDialog.showModal();
    }
});

signInDialog.querySelector("#admin-sign-in-cancel").addEventListener("click", () => {
    signInForm.reset();
    signInError.hidden = true;
    signInDialog.close();
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
        location.reload();
    } catch {
        signInError.hidden = false;
    }
});

export default auth;
