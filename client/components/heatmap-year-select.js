import { getYearsSince2025 } from "../utils/date.utils.js";

export default function HeatMapYearSelect() {
  const heatmapContainer = document.querySelector(".heatmap-container");
  const container = document.querySelector(".year-select-small-screens");
  const trigger = container.querySelector(".year-select-trigger");
  const dropdown = container.querySelector(".year-select-dropdown");
  const valueDisplay = container.querySelector(".year-select-value");

  function createComponent() {
    const years = getYearsSince2025();

    years.forEach((year, index) => {
      const option = document.createElement("li");
      option.role = "option";
      option.dataset.value = year;
      option.textContent = year;
      option.tabIndex = 0;

      if (index === 0) {
        option.classList.add("selected");
        option.setAttribute("aria-selected", "true");
        valueDisplay.textContent = year;
      }

      dropdown.appendChild(option);
    });

    trigger.addEventListener("click", toggleDropdown);

    dropdown.addEventListener("click", handleOptionClick);

    dropdown.addEventListener("keydown", handleKeydown);

    document.addEventListener("click", handleClickOutside);
  }

  function toggleDropdown() {
    const isOpen = dropdown.hidden;
    dropdown.hidden = !isOpen;
    trigger.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      // Focus the selected option when opening
      const selected = dropdown.querySelector(".selected");
      if (selected) selected.focus();
    }
  }

  function closeDropdown() {
    dropdown.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function handleOptionClick(e) {
    const option = e.target.closest("[role='option']");
    if (!option) return;

    selectOption(option);
  }

  function selectOption(option) {
    const year = option.dataset.value;

    dropdown.querySelectorAll("[role='option']").forEach((opt) => {
      opt.classList.remove("selected");
      opt.setAttribute("aria-selected", "false");
    });
    option.classList.add("selected");
    option.setAttribute("aria-selected", "true");

    valueDisplay.textContent = year;

    closeDropdown();

    const event = new CustomEvent("changeyear", {
      bubbles: true,
      detail: { year },
    });
    heatmapContainer.dispatchEvent(event);
  }

  function handleKeydown(e) {
    const options = [...dropdown.querySelectorAll("[role='option']")];
    const currentIndex = options.findIndex(
      (opt) => opt === document.activeElement
    );

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex =
          currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        options[nextIndex].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        options[prevIndex].focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (document.activeElement.matches("[role='option']")) {
          selectOption(document.activeElement);
        }
        break;
      case "Escape":
        closeDropdown();
        trigger.focus();
        break;
    }
  }

  function handleClickOutside(e) {
    if (!container.contains(e.target)) {
      closeDropdown();
    }
  }

  return { createComponent };
}
