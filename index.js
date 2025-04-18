const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

// Get stored entries or return empty array
function getEntries() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

// Save entries back to localStorage
function saveEntries(entries) {
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

// Calculate min and max DOB based on age limits (18–55)
function isValidDOB(dob) {
  const today = new Date();
  const dobDate = new Date(dob);
  const minDOB = new Date();
  const maxDOB = new Date();

  minDOB.setFullYear(today.getFullYear() - 55);
  maxDOB.setFullYear(today.getFullYear() - 18);

  return dobDate >= minDOB && dobDate <= maxDOB;
}

// Add a new row to the table
function addEntryToTable(entry) {
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = entry.name;
  row.insertCell(1).textContent = entry.email;
  row.insertCell(2).textContent = entry.password;
  row.insertCell(3).textContent = entry.dob;
  row.insertCell(4).textContent = entry.termsAccepted ? "Yes" : "No";
}

// Display all stored entries on load
function displayEntries() {
  const entries = getEntries();
  tableBody.innerHTML = ""; // Clear old content
  entries.forEach(addEntryToTable);
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
    termsAccepted: document.getElementById("terms").checked,
  };

  if (!entry.termsAccepted) {
    alert("Please accept the terms and conditions.");
    return;
  }

  if (!isValidDOB(entry.dob)) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
  addEntryToTable(entry); // Show new entry immediately
  form.reset();
});

// Show saved entries on page load
window.addEventListener("DOMContentLoaded", displayEntries);


  
