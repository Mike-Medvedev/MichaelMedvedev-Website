function HTTPClient() {
    const token = localStorage.getItem("token")
    return {
        async get(path) {
            try {
                const response = await fetch(`${window.env.BASE_URL}${path}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${token}`
                    }
                })

                const data = await response.json();
                return { data, error: null }

            } catch (error) {
                console.error(error)
                return { data: null, error }
            }
        },
        async post(path, payload) {
            try {
                const response = await fetch(`${window.env.BASE_URL}${path}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })

                const data = await response.json();
                return { data, error: null }
            } catch (error) {
                console.error(error)
                return { data: null, error }
            }

        },
        async delete(path) {
            try {
                const response = await fetch(`${window.env.BASE_URL}${path}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${token}`
                    }
                })
                const data = await response.json();
                return { data, error: null }
            } catch (error) {
                console.error(error)
                return { data: null, error }
            }

        }
    }
}
const http = HTTPClient();
export default http;