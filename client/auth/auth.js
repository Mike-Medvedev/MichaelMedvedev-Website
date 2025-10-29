

function Auth() {
    const token = localStorage.getItem("token")
    let validated = false;
    (async function validateUser() {
        const response = await fetch(`${window.env.BASE_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
        if (response.ok) {
            validated = true;
        }
    })()

    function isAdmin() {
        return validated;
    }
    return { isAdmin }
}
const auth = Auth();
export default auth;