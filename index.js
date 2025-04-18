const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntries() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

function saveEntries(entries) {
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

function isValidDOB(dob) {
  const today = new Date();
  const dobDate = new Date(dob);
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  return dobDate >= minDate && dobDate <= maxDate;
}

function addEntryToTable(entry) {
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = entry.name;
  row.insertCell(1).textContent = entry.email;
  row.insertCell(2).textContent = entry.password;
  row.insertCell(3).textContent = entry.dob;
  row.insertCell(4).textContent = entry.termsAccepted; // true/false as required
}

function displayEntries() {
  const entries = getEntries();
  tableBody.innerHTML = "";
  entries.forEach(addEntryToTable);
}

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
    alert("Please accept the terms.");
    return;
  }

  if (!isValidDOB(entry.dob)) {
    alert("Date of Birth must be between 18 and 55 years old.");
    return;
  }

  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
  addEntryToTable(entry);
  form.reset();
});

window.addEventListener("DOMContentLoaded", displayEntries);



  
