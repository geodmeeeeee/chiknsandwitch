const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");
const emptyState = document.getElementById("emptyState");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const filterOptions = document.getElementById("filterOptions");
const clearFilters = document.getElementById("clearFilters");
const filterClose = document.getElementById("filterClose");
const filterDone = document.getElementById("filterDone");
const changelogOpen = document.getElementById("changelogOpen");
const changelogDialog = document.getElementById("changelogDialog");
const changelogClose = document.getElementById("changelogClose");
const changelogText = document.getElementById("changelogText");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function card(game, index, animate = false) {
  const title = escapeHtml(game.title);
  const url = escapeHtml(game.url || "#");
  const tags = Array.isArray(game.tags) ? game.tags : [];
  const animation = animate ? ` class="game-image game-image--pop" style="--pop-delay: ${Math.min(index * 45, 540)}ms"` : ` class="game-image"`;

  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="" loading="lazy">`
    : `<div class="placeholder-art" aria-hidden="true">${["🎮", "🕹️", "👾", "🚀"][index % 4]}</div>`;

  return `
    <a class="game-card" href="${url}" aria-label="Play ${title}">
      <div${animation}>${image}</div>
      <h2 class="game-title">${title}</h2>
      ${tags.length ? `<div class="game-tags">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    </a>
  `;
}

function render(list, animate = false) {
  grid.innerHTML = list.map((game, index) => card(game, index, animate)).join("");
  emptyState.hidden = list.length !== 0;
}

function filterGames() {
  const query = search.value.trim().toLowerCase();
  const selectedTags = [...filterOptions.querySelectorAll("input:checked")].map(input => input.value);

  render(games.filter(game =>
    game.title.toLowerCase().includes(query) &&
    (selectedTags.length === 0 || selectedTags.some(tag => (game.tags || []).includes(tag)))
  ));
}

function closeDialog(dialog) {
  if (!dialog.open || dialog.dataset.closing === "true") return;

  dialog.dataset.closing = "true";
  dialog.classList.add("is-closing");

  const finishClosing = event => {
    if (event.target !== dialog || event.animationName !== "dialog-close") return;
    dialog.removeEventListener("animationend", finishClosing);
    dialog.classList.remove("is-closing");
    delete dialog.dataset.closing;
    dialog.close();
  };

  dialog.addEventListener("animationend", finishClosing);
}

function buildFilterOptions() {
  const tags = [...new Set(games.flatMap(game => Array.isArray(game.tags) ? game.tags : []))]
    .sort((first, second) => first.localeCompare(second));

  filterOptions.innerHTML = tags.map(tag => `
    <label class="filter-option">
      <input type="checkbox" value="${escapeHtml(tag)}">
      <span>${escapeHtml(tag)}</span>
    </label>
  `).join("");
}

function setFilterPanelOpen(isOpen) {
  if (isOpen && !filterPanel.open) filterPanel.showModal();
  if (!isOpen) closeDialog(filterPanel);
  filterToggle.setAttribute("aria-expanded", String(isOpen));
}

changelogOpen.addEventListener("click", async () => {
  changelogDialog.showModal();
  if (changelogText.dataset.loaded === "true") return;

  try {
    const response = await fetch("changelog.txt");
    if (!response.ok) throw new Error("Changelog could not be loaded");
    changelogText.textContent = await response.text();
    changelogText.dataset.loaded = "true";
  } catch {
    changelogText.textContent = "Unable to load changelog.txt.";
  }
});

changelogClose.addEventListener("click", () => closeDialog(changelogDialog));
changelogDialog.addEventListener("click", event => {
  if (event.target === changelogDialog) closeDialog(changelogDialog);
});
changelogDialog.addEventListener("cancel", event => {
  event.preventDefault();
  closeDialog(changelogDialog);
});

search.addEventListener("input", filterGames);
filterToggle.addEventListener("click", () => {
  setFilterPanelOpen(!filterPanel.open);
});
filterOptions.addEventListener("change", filterGames);
clearFilters.addEventListener("click", () => {
  filterOptions.querySelectorAll("input:checked").forEach(input => { input.checked = false; });
  filterGames();
});
filterClose.addEventListener("click", () => setFilterPanelOpen(false));
filterDone.addEventListener("click", () => setFilterPanelOpen(false));
filterPanel.addEventListener("click", event => {
  if (event.target === filterPanel) setFilterPanelOpen(false);
});
filterPanel.addEventListener("cancel", event => {
  event.preventDefault();
  setFilterPanelOpen(false);
});
filterPanel.addEventListener("close", () => {
  filterToggle.setAttribute("aria-expanded", "false");
});
buildFilterOptions();
render(games, true);
