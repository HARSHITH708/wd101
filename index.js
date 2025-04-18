const form = document.getElementById("registrationForm");
const entriesTable = document.querySelector("#entriesTable tbody");

// Load existing entries from localStorage
function getEntries() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

// Show entries in the table
function displayEntries() {
  const entries = getEntries();
  entriesTable.innerHTML = "";
  entries.forEach(entry => {
    const row = `<tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted ? "Yes" : "No"}</td>
    </tr>`;
    entriesTable.innerHTML += row;
  });
}

// Age validator function for 18-55 age range
function isValidDOB(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred yet this year
  const adjustedAge = m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

  return adjustedAge >= 18 && adjustedAge <= 55;
}

// Validate all form fields
function validateForm(data) {
  if (!data.name || !data.email || !data.password || !data.dob) {
    alert("Please fill all fields!");
    return false;
  }

  if (!data.termsAccepted) {
    alert("You must accept the terms and conditions.");
    return false;
  }

  if (!isValidDOB(data.dob)) {
    alert("You must be between 18 and 55 years old to register.");
    return false;
  }

  return true;
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

  if (!validateForm(entry)) return;

  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  displayEntries();
  form.reset();
});


window.addEventListener("DOMContentLoaded", displayEntries);

  
