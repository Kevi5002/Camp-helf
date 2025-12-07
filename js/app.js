// Camp-helf Super App JavaScript
// This file controls interactivity, API calls, map loading, profile saving, and events.

console.log("Camp-helf JS Loaded Successfully");

//---------------------------------------------
// NAVIGATION (Optional Enhancements)
//---------------------------------------------
// Could be used later for dynamic page loading or animations

//---------------------------------------------
// EVENTS PAGE: Fetch Events from a Public API
//---------------------------------------------
// Placeholder fetch using a dummy API for now

async function loadEvents() {
  const eventContainer = document.getElementById("event-list");
  if (!eventContainer) return;

  try {
    // Placeholder API (replace with actual events API)
    const response = await fetch("https://api.sampleapis.com/futurama/episodes");
    const data = await response.json();

    // Limit to first 6 results
    const events = data.slice(0, 6);

    eventContainer.innerHTML = ""; // Reset container

    events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "card-custom";
      card.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.desc || "No description available."}</p>
        <button class="save-btn">Add to Calendar</button>
      `;
      eventContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Events API error:", error);
  }
}

//---------------------------------------------
// DINING PAGE: Placeholder for Food Menu API
//---------------------------------------------
async function loadMenu() {
  const menuContainer = document.getElementById("menu-list");
  if (!menuContainer) return;

  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await response.json();

    const items = data.slice(0, 5);

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card-custom";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description || "Delicious campus meal option."}</p>
      `;
      menuContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Menu API error:", error);
  }
}

//---------------------------------------------
// MAP PAGE: Initialize Leaflet Map
//---------------------------------------------
function initMap() {
  const mapElement = document.getElementById("campus-map");
  if (!mapElement) return; // Only run on map page

  // Create map
  const map = L.map("campus-map").setView([41.8781, -87.6298], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Sample marker
  L.marker([41.8781, -87.6298]).addTo(map).bindPopup("Campus Center");
}

//---------------------------------------------
// PROFILE PAGE: Save User Info to Local Storage
//---------------------------------------------
function saveProfile() {
  const nameField = document.getElementById("profile-name");
  const emailField = document.getElementById("profile-email");

  if (!nameField || !emailField) return;

  const profile = {
    name: nameField.value,
    email: emailField.value,
  };

  localStorage.setItem("camphelfProfile", JSON.stringify(profile));
  alert("Profile saved!");
}

function loadProfile() {
  const saved = localStorage.getItem("camphelfProfile");
  if (!saved) return;

  const profile = JSON.parse(saved);

  const nameField = document.getElementById("profile-name");
  const emailField = document.getElementById("profile-email");

  if (nameField) nameField.value = profile.name;
  if (emailField) emailField.value = profile.email;
}

//---------------------------------------------
// PAGE INITIALIZATION
//---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  loadMenu();
  initMap();
  loadProfile();

  const saveBtn = document.getElementById("save-profile-btn");
  if (saveBtn) saveBtn.addEventListener("click", saveProfile);

  console.log("All Camp-helf scripts initialized.");
});