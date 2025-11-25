/** THEME TOGGLE LOGIC **/
const toggleBtn = document.getElementById("togglebutton");

// Load theme on start
function loadTheme() {
  const cookieChoice = getCookie("site_cookie_choice");
  const savedTheme = getCookie("site_theme");

  if (cookieChoice === "accepted" && savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }
}

// Toggle theme when button is clicked
toggleBtn.addEventListener("click", () => {
  let current = document.body.getAttribute("data-theme") || "light";
  let newTheme = current === "light" ? "dark" : "light";

  document.body.setAttribute("data-theme", newTheme);

  // Save theme ONLY if cookies are accepted
  if (getCookie("site_cookie_choice") === "accepted") {
    setCookie("site_theme", newTheme, 365);
  }
});

// Run on load
loadTheme();

// Helper: set cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Helper: get cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

const popup = document.getElementById("cookiePopup");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");

// Show popup only if no cookie is set
window.onload = () => {
  const cookieChoice = getCookie("site_cookie_choice");
  if (!cookieChoice) popup.classList.add("show");
};

// Accept
acceptBtn.addEventListener("click", () => {
  setCookie("site_cookie_choice", "accepted", 365);
  popup.classList.remove("show");
});

// Reject
rejectBtn.addEventListener("click", () => {
  setCookie("site_cookie_choice", "rejected", 365);
  popup.classList.remove("show");
});
