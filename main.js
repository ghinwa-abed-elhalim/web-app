const loginTabBtn = document.querySelector(".login-tab");
const registerTabBtn = document.querySelector(".register-tab");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const messageEl = document.querySelector(".message");
const authSection = document.querySelector(".auth-section");
const homeSection = document.querySelector(".home-section");
const quizSection = document.querySelector(".quiz-section");
const dashboardSection = document.querySelector(".dashboard-section");


const quizzes = [
  {
    title: "General Knowledge",
    questions: [
      { question: "Capital of France?", options: ["Berlin", "Paris", "Rome"], answer: "Paris" },
      { question: "Continents on Earth?", options: ["5", "6", "7"], answer: "7" },
      { question: "Red Planet?", options: ["Mars", "Venus", "Saturn"], answer: "Mars" }
    ]
  },
  {
    title: "Math Quiz",
    questions: [
      { question: "10 + 5?", options: ["10", "15", "20"], answer: "15" },
      { question: "7 x 3?", options: ["14", "21", "24"], answer: "21" },
      { question: "√64?", options: ["6", "8", "10"], answer: "8" }
    ]
  }
];

if (localStorage.getItem("quizzes") === null) {
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
}


loginTabBtn.onclick = function() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  messageEl.innerText = "";
};


registerTabBtn.onclick = function() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  messageEl.innerText = "";
};


registerForm.onsubmit = function(event) {
  event.preventDefault();

  const name = document.querySelector(".register-name").value;
  const email = document.querySelector(".register-email").value;
  const password = document.querySelector(".register-password").value;

  let users = localStorage.getItem("users");
  if (users === null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  const existingUser = users.find(function(user) {
    return user.email === email;
  });

  if (existingUser) {
    messageEl.innerText = "User already exists!";
    return;
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    scores: []
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  messageEl.innerText = "Registered! You can login now.";
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};


loginForm.onsubmit = function(event) {
  event.preventDefault();

  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-password").value;

  let users = localStorage.getItem("users");
  if (users === null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  if (email === "admin@quiz.com" && password === "admin123") {
    const adminUser = { name: "Admin", email: email };
    localStorage.setItem("currentUser", JSON.stringify(adminUser));
    showDashboard();
    return;
  }

  const user = users.find(function(user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    showHome(user);
  } else {
    messageEl.innerText = "Invalid credentials!";
  }
};


function showHome(user) {
  authSection.classList.add("hidden");
  homeSection.classList.remove("hidden");

  const welcomeMessage = document.querySelector(".welcome-message");
  welcomeMessage.innerText = "Welcome, " + user.name + "! 🌸";

  const quizList = document.querySelector(".quiz-list");
  quizList.innerHTML = "";

  const savedQuizzes = JSON.parse(localStorage.getItem("quizzes"));

  savedQuizzes.forEach(function(quiz, index) {
    const quizButton = document.createElement("button");
    quizButton.innerText = quiz.title;
    quizButton.className = "quiz-btn";
    quizButton.onclick = function() {
      showQuiz(index);
    };
    quizList.appendChild(quizButton);
  });

  const logoutButtons = document.querySelectorAll(".logout-btn");
  logoutButtons.forEach(function(btn) {
    btn.onclick = function() {
      localStorage.removeItem("currentUser");
      window.location.reload();
    };
  });
}


function showQuiz(index) {
  homeSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  const savedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
  const quiz = savedQuizzes[index];

  const quizTitle = document.querySelector(".quiz-title");
  const quizForm = document.querySelector(".quiz-form");
  const result = document.querySelector(".score-result");

  quizTitle.innerText = quiz.title;
  quizForm.innerHTML = "";
  result.innerText = "";

  quiz.questions.forEach(function(q, i) {
    const questionBox = document.createElement("div");
    questionBox.className = "question-box";

    const questionText = document.createElement("p");
    questionText.className = "question-text";
    questionText.innerText = (i + 1) + ". " + q.question;
    questionBox.appendChild(questionText);

    q.options.forEach(function(option) {
      const label = document.createElement("label");
      label.className = "option-label";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question-" + i;
      input.value = option;

      label.appendChild(input);
      label.append(" " + option);

      questionBox.appendChild(label);
    });

    quizForm.appendChild(questionBox);
  });

  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.onclick = function() {
    let score = 0;

    quiz.questions.forEach(function(q, i) {
      const selectedOption = document.querySelector('input[name="question-' + i + '"]:checked');
      if (selectedOption !== null) {
        if (selectedOption.value === q.answer) {
          score++;
        }
      }
    });

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users"));

    const userIndex = users.findIndex(function(u) {
      return u.email === currentUser.email;
    });

    const resultText = score + " / " + quiz.questions.length;

    users[userIndex].scores.push({
      quizTitle: quiz.title,
      score: resultText
    });

    localStorage.setItem("users", JSON.stringify(users));

    result.innerText = "You scored " + resultText + "! 🎉";
  };
}


function showDashboard() {
  authSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");

  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  let users = localStorage.getItem("users");
  if (users === null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  users.forEach(function(user) {
    const userCard = document.createElement("div");
    userCard.className = "user-card";

    const userName = document.createElement("h3");
    userName.className = "user-name";
    userName.innerText = user.name + " (" + user.email + ")";
    userCard.appendChild(userName);

    if (user.scores.length === 0) {
      const noScore = document.createElement("p");
      noScore.innerText = "No scores yet.";
      userCard.appendChild(noScore);
    } else {
      user.scores.forEach(function(score) {
        const scoreEl = document.createElement("p");
        scoreEl.innerText = score.quizTitle + ": " + score.score;
        userCard.appendChild(scoreEl);
      });
    }

    userList.appendChild(userCard);
  });
}


const savedUser = JSON.parse(localStorage.getItem("currentUser"));

if (savedUser !== null) {
  if (savedUser.email === "admin@quiz.com") {
    showDashboard();
  } else {
    showHome(savedUser);
  }
}
