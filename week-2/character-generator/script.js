/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Aisha Keller
  Date: 10/28/2025
  Filename: script.js
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  let _name = name;
  let _gender = gender;
  let _class = characterClass;

  return {
    getName: function() {return _name; },
    getGender: function() {return _gender; },
    getClass: function() {return _class;}
  };
}

document.getElementById("generateHero").addEventListener("click", function(e) {
  e.preventDefault();

  // Get form values
  const name = (document.getElementById("heroName") || { value: "" }).value.trim();
  const gender = (document.getElementById("heroGender") || { value: "" }).value.trim();
  const characterClass = (document.getElementById("heroClass") || { value: "" }).value.trim();

  // Create character
  const hero = createCharacter(name || "Unnamed Hero", gender || "Unknown", characterClass || "None");

  // Display character information
  let output = document.getElementById("characterOutput");
  if (!output) {
    output = document.createElement("div");
    output.id = "characterOutput";
    output.className = "character-output";
    // Insert after the form/button
    const container = document.getElementById("mainContainer") || document.body;
    container.appendChild(output);
  }

  // Build a simple display
  output.innerHTML = `
  <div class= "character-card">
    <h2>Character Created</h2>
    <p><strong>Name:</strong> ${hero.getName()}</p>
    <p><strong>Gender:</strong> ${hero.getGender()}</p>
    <p><strong>Class:</strong> ${hero.getClass()}</p>
  </div>
    `;
});