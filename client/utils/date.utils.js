export function trimTime(date) {
  const clone = new Date(date);
  return clone.toISOString().split("T")[0];
}

export function isEqualDay(date1, date2) {
  return trimTime(new Date(date1)) === trimTime(new Date(date2));
}

export function toLocalISO(date) {
  const localIso = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
  return localIso;
}
export function getYearsSince2025() {
  const START_YEAR = 2025;
  let currentYear = new Date().getFullYear();
  const arr = [];
  while (currentYear >= START_YEAR) {
    arr.push(currentYear);
    currentYear--;
  }
  return arr;
}
export function generateHeatMapYearButtons() {
  const heatmapButtons = [];
  getYearsSince2025().forEach((year) => {
    const button = document.createElement("button");
    button.id = "heatmap-year-button";
    button.classList.add("button");
    button.innerText = year;
    button.dataset.year = year;
    heatmapButtons.push(button);
  });
  return heatmapButtons;
}
