/*
  Pragmatic JavaScript
  Chapter 3
  Programming Assignment

  Author: Aisha Keller
  Date: 12/06/2025
  Filename: chefs.js
*/

"use strict";

// Define an array of chef objects with a mythical theme
let chefs = [
{
  image:"wizard.png",
  errorImage: "oopswizard.png",
  name: "Merlin the Culinary Wizard",
  specialty: "Enchanted Elixirs and Mystical Soups",
  weakness: "Sometimes forgets spells and over-seasons dishes",
  restaurantLocation: "The Crystal Tower"
},
{
  image:"warrior.png",
  errorImage: "oopswarrior.png",
  name: "Valkyrie Ironforge",
  specialty: "Hearty Warrior Feasts and Battle Bread",
  weakness: "Tends to burn everything with dragon fire",
  restaurantLocation: "The Golden Hall"
},
{
  image:"rogue.png",
  errorImage: "oopsrogue.png",
  name: "Shadow the Rogue Baker",
  specialty: "Silent Souffles and Stealth Desserts",
  weakness: "Steals ingredients from other kitchens",
  restaurantLocation: "The Hidden Nook"
}
];

// Define a function to retrieve the first chef's information - The wizard
function retrieveChef1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly reject 30% of the time to simulate failures
      if (Math.random() <0.7) {
        resolve(chefs[0]);
      } else {
        reject({message: "The wizard's spell failed!", errorImage: chefs[0].errorImage});
      }
    }, 2000); // 2 seconds delay
  });
}

// Define a function to retrieve the second chef's information - The Valkyrie
function retrieveChef2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly reject 30% of the time to simulate failures
      if (Math.random() <0.7) {
        resolve(chefs[1]);
      } else {
        reject({message: "The Valkyrie's fire got out of control!", errorImage: chefs[1].errorImage});
    }
  }, 4000); // 4 seconds delay
  // This function should return a promise that resolves with the chef's information after a delay
});
}

// Define a function to retrieve the third chef's information - The Rogue Baker
function retrieveChef3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly reject 30% of the time to simulate failures
      if (Math.random() < 0.7) {
        resolve(chefs[2]);
      } else {
        reject({message: "The rogue has vanished!", errorImage: chefs[2].errorImage});
      }
    }, 6000); // 6 seconds delay
  });
}

// Function to display chef information
function displayChef(chef, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
  <div class="chef-card">
    <img src="${chef.image}" alt="${chef.name}" class="chef-image">
    <h2>${chef.name}</h2>
    <div class="chef-details">
      <p><strong>Specialty:</strong> ${chef.specialty}</p>
      <p><strong>Weakness:</strong> ${chef.weakness}</p>
      <p><strong>Restaurant Location:</strong> ${chef.restaurantLocation}</p>
    </div>
  </div>
  `;
  container.classList.add("loaded");
}

// Function to display error
function displayError(errorData, containerId) {
  const container = document.getElementById(containerId);

  // Handle both string and object error data
  const message = typeof errorData === 'string' ? errorData : errorData.message;
  const errorImage = typeof errorData === 'object' && errorData.errorImage ? errorData.errorImage : 'oopswizard.png';

  container.innerHTML = `
  <div class="error-card">
    <img src="${errorImage}" alt="Error Image" class="error-image">
    <h2>Oops!</h2>
    <p>${message}</p>
    </div>
  `;
  container.classList.add('loaded');
}

// Function to show loading state
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
  <div class="loading-card">
  <div class="spinner"></div>
  <p>Loading chef data...</p>
  </div>
  `;
  container.classList.add('loaded'); // Make it visible
}

// Show loading states initially
showLoading('chef1');
showLoading('chef2');
showLoading('chef3');

// Use Promise.allSettled to retrieve all chefs' information and update the webpage accordingly
Promise.allSettled([retrieveChef1(), retrieveChef2(), retrieveChef3()])
.then(results => {
  results.forEach((result, index) => {
    const containerId = `chef${index + 1}`;

    if (result.status === 'fulfilled') {
      // Promise was successful -display chef data
      displayChef(result.value, containerId);
    } else {
      // Promise was rejected - display error message
      displayError(result.reason, containerId);
    }
  });
});