import http from "../http/http.client.js"
function ActivityCount() {
    const id = Symbol.for("ActivityCount")
    const p = document.querySelector(".activity-count");
    async function mount() {
        const { data, error } = await http.get(`/activities/count`)
        const count = data.count;
        p.innerText = `${count} Activities in the last year`
    }
    async function render(count) {
        p.innerText = `${count} Activities in the last year`
    }
    return { id, mount, render }
}
const activityCount = ActivityCount();
await activityCount.mount();

export default activityCount;