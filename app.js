const grid = document.getElementById("gameGrid");
const homeGames = document.getElementById("homeGames");
const navigationTabs = [...document.querySelectorAll("[data-view]")];
const darkMode = document.getElementById("darkMode");
const reduceMotion = document.getElementById("reduceMotion");
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
const gameMute = document.getElementById("gameMute");
const gameFullscreen = document.getElementById("gameFullscreen");
const gameFrame = document.getElementById("gameFrame");
const gameFrameLoader = document.getElementById("gameFrameLoader");
const pagination = document.getElementById("pagination");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageNumbers = document.getElementById("pageNumbers");
const pageInput = document.getElementById("pageInput");
const pageCountLabel = document.getElementById("pageCount");
const statusBar = document.querySelector(".status-bar");
const localClock = document.getElementById("localClock");
const batteryIndicator = document.querySelector(".battery-indicator");
const batteryLevel = document.getElementById("batteryLevel");
const batteryFill = document.getElementById("batteryFill");
const clockEnabled = document.getElementById("clockEnabled");
const batteryEnabled = document.getElementById("batteryEnabled");
const gamesPerPage = 24;
const mostPopularGameTitles = [
  "Minecraft",
  "The Binding Of Issac Repentance",
  "Kour.io",
  "Ultrakill"
];
let currentPage = 1;
let filteredGames = games;

function showView(viewName) {
  const viewOrder = ["settings", "home", "games"];
  const currentView = document.querySelector(".page-view:not([hidden])");
  const currentName = currentView?.id.replace("View", "");
  const directionClass = viewOrder.indexOf(viewName) > viewOrder.indexOf(currentName)
    ? "is-entering-from-right"
    : "is-entering-from-left";

  document.querySelectorAll(".page-view").forEach(view => {
    const isSelected = view.id === `${viewName}View`;
    view.hidden = !isSelected;
    view.classList.remove("is-entering-from-left", "is-entering-from-right");
    if (isSelected && currentView !== view) view.classList.add(directionClass);
  });
  document.querySelectorAll(".navigation-tab").forEach(tab => {
    const isActive = tab.dataset.view === viewName;
    tab.classList.toggle("is-active", isActive);
    if (isActive) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
  });
}

function updateLocalClock() {
  if (!localClock) return;

  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: false
  });

  const formatted = formatter.format(new Date());
  localClock.textContent = formatted;
  localClock.setAttribute("datetime", new Date().toISOString());
  localClock.setAttribute("aria-label", `Current time: ${formatted}`);
}

function syncStatusToggles() {
  const clockIsEnabled = localStorage.getItem("clockEnabled") !== "false";
  const batteryIsEnabled = localStorage.getItem("batteryEnabled") !== "false";

  if (clockEnabled) clockEnabled.checked = clockIsEnabled;
  if (batteryEnabled) batteryEnabled.checked = batteryIsEnabled;

  if (localClock) {
    localClock.hidden = !clockIsEnabled;
    localClock.style.display = clockIsEnabled ? "inline-flex" : "none";
  }

  if (batteryIndicator) {
    batteryIndicator.hidden = !batteryIsEnabled;
    batteryIndicator.style.display = batteryIsEnabled ? "inline-flex" : "none";
    batteryIndicator.setAttribute("aria-hidden", String(!batteryIsEnabled));
  }

  if (statusBar) {
    const shouldShowStatusBar = clockIsEnabled || batteryIsEnabled;
    statusBar.hidden = !shouldShowStatusBar;
    statusBar.style.display = shouldShowStatusBar ? "inline-flex" : "none";
  }
}

function setClockPreference(enabled) {
  localStorage.setItem("clockEnabled", String(enabled));
  syncStatusToggles();
}

function setBatteryPreference(enabled) {
  localStorage.setItem("batteryEnabled", String(enabled));
  syncStatusToggles();
}

function updateBatteryStatus() {
  if (!batteryLevel || !batteryFill) return;

  if (!navigator.getBattery) {
    batteryLevel.textContent = "--%";
    batteryFill.style.setProperty("width", "0%");
    return;
  }

  navigator.getBattery().then(battery => {
    const applyStatus = () => {
      const percent = Math.round(battery.level * 100);
      batteryLevel.textContent = `${percent}%`;
      batteryFill.style.setProperty("width", `${percent}%`);
      batteryFill.style.setProperty("opacity", battery.charging ? "1" : "0.9");
      batteryFill.setAttribute("aria-label", `Battery ${percent}%`);
    };

    applyStatus();
    battery.addEventListener("levelchange", applyStatus);
    battery.addEventListener("chargingchange", applyStatus);
  }).catch(() => {
    batteryLevel.textContent = "--%";
    batteryFill.style.setProperty("width", "0%");
  });
}

function attachImageLoadingState(container) {
  const image = container.querySelector("img");
  if (!image) return;

  const startLoading = () => {
    container.classList.add("is-loading");
    container.setAttribute("data-loading", "true");
  };

  const stopLoading = () => {
    container.classList.remove("is-loading");
    container.removeAttribute("data-loading");
  };

  startLoading();
  image.addEventListener("load", stopLoading, { once: true });
  image.addEventListener("error", stopLoading, { once: true });
}

function renderHome() {
  const popularGames = mostPopularGameTitles
    .map(title => games.find(game => game.title.toLowerCase() === title.toLowerCase()))
    .filter(Boolean);
  homeGames.innerHTML = popularGames.map((game, index) => card(game, index)).join("");
  homeGames.querySelectorAll(".game-image").forEach(container => attachImageLoadingState(container));
}

function setReducedMotion(enabled) {
  document.documentElement.classList.toggle("reduce-motion", enabled);
  localStorage.setItem("reduceMotion", String(enabled));
}

function setTheme(isDark) {
  const theme = isDark ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function card(game, index, animationType = "", includeTags = true) {
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
    ? `<img src="${escapeHtml(game.image)}" alt="" loading="lazy"><span class="loading-spinner" aria-hidden="true"></span>`
    : `<div class="placeholder-art" aria-hidden="true">${["🎮", "🕹️", "👾", "🚀"][index % 4]}</div>`;

  return `
    <a class="game-card" href="${url}" data-game-url="${url}" data-game-title="${title}" aria-label="Play ${title}">
      <div${animation}>${image}</div>
      <h2 class="game-title">${title}</h2>
      ${includeTags && tags.length ? `<div class="game-tags">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
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
  grid.querySelectorAll(".game-image").forEach(container => attachImageLoadingState(container));
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
  if (gameFrameLoader) gameFrameLoader.classList.remove("is-hidden");
  gamePlayer.classList.add("is-fullscreen");
  gamePlayer.showModal();
  gameFrame.src = url;
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

function syncMuteButton() {
  if (!gameMute || !gameFrame) return;

  const isMuted = gameFrame.muted;
  const label = isMuted ? "Unmute game" : "Mute game";
  gameMute.setAttribute("aria-label", label);
  gameMute.title = label;
  gameMute.dataset.muted = String(isMuted);
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

function handleGameClick(event) {
  const target = event.target.closest("[data-game-url]");
  if (!target || event.button !== 0) return;

  const url = target.dataset.gameUrl;
  if (!url || url === "#") return;

  event.preventDefault();
  openGamePlayer(target.dataset.gameTitle, url);
}

grid.addEventListener("click", handleGameClick, true);
homeGames.addEventListener("click", handleGameClick, true);
navigationTabs.forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view)));
darkMode.checked = localStorage.getItem("theme") !== "light";
document.documentElement.dataset.theme = darkMode.checked ? "dark" : "light";
darkMode.addEventListener("change", () => setTheme(darkMode.checked));
reduceMotion.checked = localStorage.getItem("reduceMotion") === "true";
document.documentElement.classList.toggle("reduce-motion", reduceMotion.checked);
reduceMotion.addEventListener("change", () => setReducedMotion(reduceMotion.checked));
clockEnabled.checked = localStorage.getItem("clockEnabled") !== "false";
batteryEnabled.checked = localStorage.getItem("batteryEnabled") !== "false";
clockEnabled.addEventListener("change", () => setClockPreference(clockEnabled.checked));
batteryEnabled.addEventListener("change", () => setBatteryPreference(batteryEnabled.checked));
syncStatusToggles();
gamePlayerClose.addEventListener("click", () => closeGamePlayer());
gameMute.addEventListener("click", () => {
  gameFrame.muted = !gameFrame.muted;
  syncMuteButton();
});
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
  if (gameFrameLoader) gameFrameLoader.classList.add("is-hidden");
  syncFullscreenButton();
  syncMuteButton();
});
gameFrame.addEventListener("load", () => {
  if (gameFrameLoader) gameFrameLoader.classList.add("is-hidden");
});
gameFrame.addEventListener("error", () => {
  if (gameFrameLoader) gameFrameLoader.classList.add("is-hidden");
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
updateLocalClock();
updateBatteryStatus();
setInterval(updateLocalClock, 1000);
render(games, "pop");
renderHome();
