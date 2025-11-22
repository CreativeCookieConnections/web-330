/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author:
  Date:
  Filename:
*/

// Create an in-memory object array for each table in the restaurant
let tables = [
  { tableNumber: 1, capacity: 2, isReserved: false},
  { tableNumber: 2, capacity: 2, isReserved: false},
  { tableNumber: 3, capacity: 4, isReserved: false},
  { tableNumber: 4, capacity: 4, isReserved: false},
  { tableNumber: 5, capacity: 6, isReserved: false},
  { tableNumber: 6, capacity: 6, isReserved: false},
  { tableNumber: 7, capacity: 8, isReserved: false},
  { tableNumber: 8, capacity: 2, isReserved: false},
];

// Create a function reserveTable
function reserveTable(tableNumber, callback, time) {
  // Find the table in the array
  const table = tables.find(t => t.tableNumber === tableNumber);

  // Check if table exists
  if (!table) {
    callback(`Error: Table ${tableNumber} does not exist.`);
    return;
  }

  // Check if table is available
  if (table.isReserved) {
    callback(`Rawr! Table ${tableNumber} is already reserved.`);
  } else {
    // Update the isReserved property
    table.isReserved = true;

    // Use setTimeout to wait for specified time, then callback with success message
    setTimeout(() => {
      callback(`Success: Table ${tableNumber} has been reserved.`);
      }, time);
    }
  }

// When the form is submitted, call the reserveTable function
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get the form values
    const name = document.getElementById("name").value;
    const tableNumber = parseInt(document.getElementById("tableNumber").value);
    const messageElement = document.getElementById("message");

    // Validate inputs
    if (!name || !tableNumber) {
      messageElement.textContent = "Rawr! Please enter both name and table number.";
      messageElement.style.color = "red";
      return;
    }

    // Display a waiting message
    messageElement.textContent = "Processing your reservation this won't take a century...";
    messageElement.style.color = "blue";

    // Call reserveTable with a callback function and a 2 second delay
    reserveTable(tableNumber, function (message) {
      messageElement.textContent = message;

      // Style the message based on success or error
      if (message.startsWith("Success")) {
        messageElement.style.color = "green";
      } else {
        messageElement.style.color = "red";
      }
    }, 2000); // 2000 milliseconds = 2 seconds
  });
