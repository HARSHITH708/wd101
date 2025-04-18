const form = document.getElementById("registrationForm");
const entriesTable = document.querySelector("#entriesTable tbody");

function getEntries() {
  return JSON.parse(localStorage.getItem("userEntries")) || [];
}

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

function validateForm(data) {
  if (!data.name || !data.email || !data.password || !data.dob) {
    alert("Please fill all fields!");
    return false;
  }

  if (!data.termsAccepted) {
    alert("You must accept the terms and conditions.");
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
