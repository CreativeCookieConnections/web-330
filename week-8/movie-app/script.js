/*
  Pragmatic JavaScript
  Chapter 4
  Programming Assignment

  Author: Aisha Keller
  Date: 12/12/2025
  Filename: script.js
*/

"use strict";

const movies = [
  // Movie data here
{
    title: "Spirited Away",
    director: "Hayao Miyazaki",
    year: 2001,
    synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are transformed into beasts."
  },
  {
    title: "My Neighbor Totoro",
    director: "Hayao Miyazaki",
    year: 1988,
    synopsis: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby."
  },
  {
    title: "Princess Mononoke",
    director: "Hayao Miyazaki",
    year: 1997,
    synopsis: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony."
  },
  {
    title: "Howl's Moving Castle",
    director: "Hayao Miyazaki",
    year: 2004,
    synopsis: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle."
  },
  {
    title: "Kiki's Delivery Service",
    director: "Hayao Miyazaki",
    year: 1989,
    synopsis: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service."
  },
  {
    title: "Ponyo",
    director: "Hayao Miyazaki",
    year: 2008,
    synopsis: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him."
  },
  {
    title: "Castle in the Sky",
    director: "Hayao Miyazaki",
    year: 1986,
    synopsis: "Pazu's life changes when he meets Sheeta, a girl who floats down from the sky. Together they must fight pirates and foreign agents as they search for a legendary floating castle."
  },
  {
    title: "The Tale of Princess Kaguya",
    director: "Isao Takahata",
    year: 2013,
    synopsis: "Found inside a shining stalk of bamboo by an old bamboo cutter and his wife, a tiny girl grows rapidly into an exquisite young lady. The mysterious young princess enthralls all who encounter her, but ultimately she must confront her fate."
  },
  {
    title: "Grave of the Fireflies",
    director: "Isao Takahata",
    year: 1988,
    synopsis: "A young boy and his little sister struggle to survive in Japan during World War II."
  },
  {
    title: "The Wind Rises",
    director: "Hayao Miyazaki",
    year: 2013,
    synopsis: "A look at the life of Jiro Horikoshi, the man who designed Japanese fighter planes during World War II."
  }
];

function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    // Simulate network delay with setTimeout (1 second)
    setTimeout(() => {
      // Search for the movie by title
      const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());

      if (movie) {
        resolve(movie);
      } else {
        reject(new Error(`Movie "${title}" not found in the database.`));
      }
    }, 1000);
  });
}

async function displayMovie(title) {
  // Get elements
  const movieTitle = document.getElementById("movie-title");
  const movieDirector = document.getElementById("movie-director");
  const movieYear = document.getElementById("movie-year");
  const movieSynopsis = document.getElementById("movie-synopsis");
  const errorMessage = document.getElementById("error-message");

  // Clear previous results
  movieTitle.textContent = "";
  movieDirector.textContent = "";
  movieYear.textContent = "";
  movieSynopsis.textContent = "";
  errorMessage.textContent = "";

  try {
    // show loading message
    movieTitle.textContent = "Loading...";

    // Await the movie fetch
    const movie = await fetchMovie(title);

    // Display the movie information
    movieTitle.textContent = movie.title;
    movieDirector.textContent = `Director: ${movie.director}`;
    movieYear.textContent = `Release Year: ${movie.year}`;
    movieSynopsis.textContent = movie.synopsis;

  } catch (error) {
    // Handle errors
    movieTitle.textContent = "";
    errorMessage.textContent = error.message;
  }
}

document.getElementById("movie-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the title input value
  const titleInput = document.getElementById("title-input");
  const title = titleInput.value.trim();

  // Validate input
  if (title === "") {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Please enter a movie title.";
    return;
  }

  // Call displayMovie function
  await displayMovie(title);

  // Clear the input field
  titleInput.value = "";
});