import http from "../http/http.client.js"

async function Auth() {
    let validated = false;
    
    const { data, error } = await http.get("/auth/token");
    validated = !!data;

    return { isAdmin: () => validated }
}

const auth = await Auth();
export default auth;