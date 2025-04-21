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
    
    if (user.scores.length === 0) {
        const noScores = document.createElement("p");
        noScores.innerText = "No scores yet.";
        userCard.appendChild(noScores);
    } else {
        user.scores.forEach(function (score) {
            const scoreItem = document.createElement("p");
            scoreItem.innerText = `${score.quizTitle}: ${score.score}`;
            userCard.appendChild(scoreItem);
        });
    }
    
    userListContainer.appendChild(userCard);
});

logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
})
    