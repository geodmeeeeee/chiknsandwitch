// Replace this with the ROT13-encoded form of the password to change it.
const PASSWORD_CIPHER = "nccyr";
const SITE_PASSWORD = PASSWORD_CIPHER.replace(/[a-z]/gi, letter => {
  const code = letter.charCodeAt(0);
  const base = code >= 97 ? 97 : 65;
  return String.fromCharCode((code - base + 13) % 26 + base);
});
const accessForm = document.getElementById("accessForm");

if (accessForm) {
  if (sessionStorage.getItem("siteAccessGranted") === "true") {
    window.location.replace("index.html");
  }

  accessForm.addEventListener("submit", event => {
    event.preventDefault();
    const passwordInput = document.getElementById("sitePassword");
    const accessError = document.getElementById("accessError");

    if (passwordInput.value !== SITE_PASSWORD) {
      accessError.hidden = false;
      passwordInput.select();
      return;
    }

    sessionStorage.setItem("siteAccessGranted", "true");
    window.location.replace("index.html");
  });
} else if (sessionStorage.getItem("siteAccessGranted") !== "true") {
  window.location.replace("login.html");
} else {
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("main.container").hidden = false;
  });
}