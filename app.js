const grid = document.getElementById("gameGrid");
const search = document.getElementById("search");
const emptyState = document.getElementById("emptyState");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const filterOptions = document.getElementById("filterOptions");
const clearFilters = document.getElementById("clearFilters");
const filterClose = document.getElementById("filterClose");
const filterDone = document.getElementById("filterDone");
const gamePlayer = document.getElementById("gamePlayer");
const gamePlayerTitle = document.getElementById("gamePlayerTitle");
const gamePlayerClose = document.getElementById("gamePlayerClose");
const gameFullscreen = document.getElementById("gameFullscreen");
const gameFrame = document.getElementById("gameFrame");
const pagination = document.getElementById("pagination");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageNumbers = document.getElementById("pageNumbers");
const pageInput = document.getElementById("pageInput");
const pageCountLabel = document.getElementById("pageCount");
const gamesPerPage = 24;
let currentPage = 1;
let filteredGames = games;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function card(game, index, animationType = "") {
  const title = escapeHtml(game.title);
  const url = escapeHtml(game.url || "#");
  const tags = Array.isArray(game.tags) ? game.tags : [];
  const delay = animationType === "page"
    ? Math.min((index % gamesPerPage) * 16, 192)
    : Math.min(index * 45, 540);
  const animation = animationType
    ? ` class="game-image game-image--${animationType}" style="--pop-delay: ${delay}ms"`
    : ` class="game-image"`;

  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="" loading="lazy">`
    : `<div class="placeholder-art" aria-hidden="true">${["🎮", "🕹️", "👾", "🚀"][index % 4]}</div>`;

  return `
    <a class="game-card" href="${url}" data-game-url="${url}" data-game-title="${title}" aria-label="Play ${title}">
      <div${animation}>${image}</div>
      <h2 class="game-title">${title}</h2>
      ${tags.length ? `<div class="game-tags">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    </a>
  `;
}

function updatePagination(pageCount) {
  pagination.hidden = filteredGames.length <= gamesPerPage;
  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === pageCount;
  pageCountLabel.textContent = `of ${pageCount}`;
  pageInput.max = String(pageCount);
  pageInput.value = String(currentPage);

  const visiblePages = new Set([1, pageCount]);
  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 0 && page <= pageCount) visiblePages.add(page);
  }

  let previousVisiblePage = 0;
  pageNumbers.innerHTML = [...visiblePages].sort((first, second) => first - second)
    .map(page => {
      const gap = page - previousVisiblePage > 1 ? `<span class="page-ellipsis" aria-hidden="true">...</span>` : "";
      const current = page === currentPage;
      previousVisiblePage = page;
      return `${gap}<button class="page-number${current ? " is-current" : ""}" type="button" data-page="${page}"${current ? ` aria-current="page"` : ""}>${page}</button>`;
    }).join("");
}

function render(list, animationType = "") {
  filteredGames = list;
  const pageCount = Math.max(1, Math.ceil(list.length / gamesPerPage));
  currentPage = Math.min(currentPage, pageCount);
  const start = (currentPage - 1) * gamesPerPage;
  grid.innerHTML = list.slice(start, start + gamesPerPage)
    .map((game, index) => card(game, start + index, animationType)).join("");
  emptyState.hidden = list.length !== 0;
  updatePagination(pageCount);
}

function filterGames() {
  const query = search.value.trim().toLowerCase();
  const selectedTags = [...filterOptions.querySelectorAll("input:checked")].map(input => input.value);

  currentPage = 1;
  render(games.filter(game =>
    game.title.toLowerCase().includes(query) &&
    (selectedTags.length === 0 || selectedTags.some(tag => (game.tags || []).includes(tag)))
  ));
}

function goToPage(page) {
  const pageCount = Math.ceil(filteredGames.length / gamesPerPage);
  if (page < 1 || page > pageCount) return;

  currentPage = page;
  render(filteredGames, "page");
  grid.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
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

function openGamePlayer(title, url) {
  gamePlayerTitle.textContent = title;
  gameFrame.title = `${title} game`;
  gameFrame.src = url;
  gamePlayer.classList.add("is-fullscreen");
  gamePlayer.showModal();
  syncFullscreenButton();
}

function closeGamePlayer() {
  if (!gamePlayer.open || gamePlayer.dataset.closing === "true") return;
  gamePlayer.classList.remove("is-fullscreen");
  closeDialog(gamePlayer);
}

function syncFullscreenButton() {
  const isFullscreen = document.fullscreenElement === gameFrame;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
  gameFullscreen.setAttribute("aria-label", label);
  gameFullscreen.title = label;
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

grid.addEventListener("click", event => {
  const card = event.target.closest(".game-card");
  if (!card || event.button !== 0) return;

  const url = card.dataset.gameUrl;
  if (!url || url === "#") return;

  event.preventDefault();
  openGamePlayer(card.dataset.gameTitle, url);
}, true);
gamePlayerClose.addEventListener("click", () => closeGamePlayer());
gamePlayer.addEventListener("click", event => {
  if (event.target === gamePlayer) closeGamePlayer();
});
gamePlayer.addEventListener("cancel", event => {
  event.preventDefault();
  if (document.fullscreenElement === gameFrame) {
    document.exitFullscreen().catch(error => {
      console.error("Unable to exit fullscreen.", error);
    });
    return;
  }
  closeGamePlayer();
});
gamePlayer.addEventListener("close", () => {
  gameFrame.src = "about:blank";
  syncFullscreenButton();
});
gameFullscreen.addEventListener("click", async () => {
  if (document.fullscreenElement === gameFrame) {
    try {
      await document.exitFullscreen();
    } catch (error) {
      console.error("Unable to exit fullscreen.", error);
    }
    return;
  }

  try {
    if (typeof gameFrame.requestFullscreen !== "function") throw new Error("Fullscreen API is unavailable");
    await gameFrame.requestFullscreen();
  } catch (error) {
    console.error("Unable to enter fullscreen.", error);
  }
});
document.addEventListener("fullscreenchange", syncFullscreenButton);

search.addEventListener("input", filterGames);
previousPage.addEventListener("click", () => goToPage(currentPage - 1));
nextPage.addEventListener("click", () => goToPage(currentPage + 1));
pageNumbers.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (button) goToPage(Number(button.dataset.page));
});
pageInput.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  if (!pageInput.reportValidity()) return;
  goToPage(Number(pageInput.value));
});
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
render(games, "pop");
