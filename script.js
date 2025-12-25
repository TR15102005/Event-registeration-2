// Simple login system
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

      if (user === "admin" && pass === "admin123") {
        window.location.href = "admin.html";
      } else if (user === "student" && pass === "student123") {
        window.location.href = "student.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  // Admin registration form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("studentName").value;
      const dept = document.getElementById("studentDept").value;
      const event = document.getElementById("eventSelect").value;
      const date = document.getElementById("eventDate").value;

      const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
      registrations.push({ name, dept, event, date });
      localStorage.setItem("registrations", JSON.stringify(registrations));

      alert("Student registered successfully!");
      registerForm.reset();
    });
  }

  // Student dashboard
  const studentTable = document.getElementById("studentTable");
  if (studentTable) {
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.forEach(reg => {
      const row = studentTable.insertRow();
      row.insertCell(0).innerText = reg.name;
      row.insertCell(1).innerText = reg.dept;
      row.insertCell(2).innerText = reg.event;
      row.insertCell(3).innerText = reg.date;
    });
  }
});

// Logout function
function logout() {
  window.location.href = "index.html";
}

// Example student accounts
const users = [
  { role: "admin", username: "admin", password: "admin123" },
  { role: "student", username: "alice", password: "alice123" },
  { role: "student", username: "bob", password: "bob123" }
];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found));
    if (found.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "student.html";
    }
  } else {
    alert("Invalid credentials!");
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("studentName").value;
  const dept = document.getElementById("studentDept").value;
  const event = document.getElementById("eventSelect").value;
  const date = document.getElementById("eventDate").value;

  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push({ username: name.toLowerCase(), dept, event, date });
  localStorage.setItem("registrations", JSON.stringify(registrations));

  alert("Student registered successfully!");
  registerForm.reset();
});

const studentTable = document.getElementById("studentTable");
if (studentTable) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  const myRegs = registrations.filter(r => r.username === currentUser.username);

  myRegs.forEach(reg => {
    const row = studentTable.insertRow();
    row.insertCell(0).innerText = currentUser.username;
    row.insertCell(1).innerText = reg.dept;
    row.insertCell(2).innerText = reg.event;
    row.insertCell(3).innerText = reg.date;
  });
}