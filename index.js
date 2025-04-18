const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntries() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

function saveEntries(entries) {
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isValidDOB(dob) {
  const age = calculateAge(dob);
  return age >= 18 && age <= 55;
}

function addEntryToTable(entry) {
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = entry.name;
  row.insertCell(1).textContent = entry.email;
  row.insertCell(2).textContent = entry.password;
  row.insertCell(3).textContent = entry.dob;
  row.insertCell(4).textContent = entry.termsAccepted ? "Yes" : "No";
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
    alert("Please accept the terms and conditions.");
    return;
  }

  if (!isValidDOB(entry.dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entries = getEntries();
  entries.push(entry);
  saveEntries(entries);
  addEntryToTable(entry);

  form.reset();
});

window.addEventListener("DOMContentLoaded", displayEntries);


  
