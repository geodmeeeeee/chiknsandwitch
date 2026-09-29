const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");
const emptyState = document.getElementById("emptyState");
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

function card(game, index) {
  const title = escapeHtml(game.title);
  const url = escapeHtml(game.url || "#");

  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="" loading="lazy">`
    : `<div class="placeholder-art" aria-hidden="true">${["🎮", "🕹️", "👾", "🚀"][index % 4]}</div>`;

  return `
    <a class="game-card" href="${url}" aria-label="Play ${title}">
      <div class="game-image">${image}</div>
      <h2 class="game-title">${title}</h2>
    </a>
  `;
}

function render(list) {
  grid.innerHTML = list.map(card).join("");
  emptyState.hidden = list.length !== 0;
}

function filterGames() {
  const query = search.value.trim().toLowerCase();

  render(games.filter(game =>
    game.title.toLowerCase().includes(query)
  ));
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

changelogClose.addEventListener("click", () => changelogDialog.close());
changelogDialog.addEventListener("click", event => {
  if (event.target === changelogDialog) changelogDialog.close();
});

search.addEventListener("input", filterGames);
render(games);
