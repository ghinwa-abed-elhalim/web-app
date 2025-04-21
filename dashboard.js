const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.email !== "admin@quiz.com") {
    window.location.href = "index.html";
}

const userListContainer = document.querySelector(".user-list");
const logoutButton = document.querySelector(".logout-btn");
const users = JSON.parse(localStorage.getItem("users") || "[]");


users.forEach(function (user) {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    
    const userTitle = document.createElement("h3");
    userTitle.classList.add("user-name");
    userTitle.innerText = user.name + " (" + user.email + ")";
    userCard.appendChild(userTitle);
  