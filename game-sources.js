/*
  External game hosting configuration.

  Add each public GitHub Pages site below. Keep the trailing slash optional.
  Example:
    { name: "Main games", baseUrl: "https://YOUR-USERNAME.github.io/YOUR-GAME-REPO/" }

  Set DEFAULT_GAME_REPOSITORY to a repository number to host every game there.
  Use null to keep games local unless a title is assigned below.

  To split games across repositories, assign titles in
  GAME_REPOSITORY_ASSIGNMENTS. Repository numbers start at 0.
*/

const GAME_REPOSITORIES = [
  { name: "Game repository 1", baseUrl: "" },
  { name: "Game repository 2", baseUrl: "" },
  { name: "Game repository 3", baseUrl: "" }
];

// Change this one value to move every unassigned game to a repository.
// null = use the existing local games/ folder.
const DEFAULT_GAME_REPOSITORY = null;

// Optional per-game routing. These entries override the default above.
// Example: "Minecraft": 1 sends Minecraft to GAME_REPOSITORIES[1].
const GAME_REPOSITORY_ASSIGNMENTS = {
  // "Minecraft": 0,
  // "Ultrakill": 1
};

function getGameUrl(game) {
  const hasOverride = Object.prototype.hasOwnProperty.call(
    GAME_REPOSITORY_ASSIGNMENTS,
    game.title
  );
  const repositoryIndex = hasOverride
    ? GAME_REPOSITORY_ASSIGNMENTS[game.title]
    : DEFAULT_GAME_REPOSITORY;

  if (!Number.isInteger(repositoryIndex)) return game.url || "#";

  const repository = GAME_REPOSITORIES[repositoryIndex];
  const configuredBase = repository && String(repository.baseUrl || "").trim();
  if (!configuredBase) return game.url || "#";

  try {
    const base = new URL(configuredBase);
    if (base.protocol !== "https:" && base.protocol !== "http:") {
      throw new Error("Game repositories must use HTTP or HTTPS.");
    }
    if (!base.pathname.endsWith("/")) base.pathname += "/";
    return new URL(String(game.url || "").replace(/^\/+/, ""), base).href;
  } catch (error) {
    console.error("Invalid game repository URL:", configuredBase, error);
    return game.url || "#";
  }
}
