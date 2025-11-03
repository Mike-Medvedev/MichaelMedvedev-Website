import http from "../http/http.client.js"
export default function ActvityCount(){
    const p = document.querySelector(".activity-count");
    async function mount(){
        const { data, error } = await http.get(`/activities/count`)
        const count = data.count;
        p.innerText = `${count} Activities in the last year`
    }
    return {
        mount
    }
}