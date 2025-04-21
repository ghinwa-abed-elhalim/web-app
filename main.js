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
if (!localStorage.getItem("quizzes")) localStorage.setItem("quizzes", JSON.stringify(quizzes));


loginTabBtn.onclick = () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  messageEl.innerText = "";
};
registerTabBtn.onclick = () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  messageEl.innerText = "";
};


registerForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.querySelector(".register-name").value;
  const email = document.querySelector(".register-email").value;
  const password = document.querySelector(".register-password").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.email === email)) {
    messageEl.innerText = "User already exists!";
    return;
  }

  users.push({ name, email, password, scores: [] });
  localStorage.setItem("users", JSON.stringify(users));
  messageEl.innerText = "Registered! You can login now.";
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};


loginForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-password").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (email === "admin@quiz.com" && password === "admin123") {
    localStorage.setItem("currentUser", JSON.stringify({ name: "Admin", email }));
    showDashboard();
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
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
  document.querySelector(".welcome-message").innerText = `Welcome, ${user.name}! 🌸`;
  const quizList = document.querySelector(".quiz-list");
  quizList.innerHTML = "";
  JSON.parse(localStorage.getItem("quizzes")).forEach((quiz, index) => {
    const btn = document.createElement("button");
    btn.innerText = quiz.title;
    btn.className = "quiz-btn";
    btn.onclick = () => showQuiz(index);
    quizList.appendChild(btn);
  });
  document.querySelectorAll(".logout-btn").forEach(btn => {
    btn.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    };
  });
}


function showQuiz(index) {
  homeSection.classList.add("hidden");
  quizSection.classList.remove("hidden");

  const quiz = JSON.parse(localStorage.getItem("quizzes"))[index];
  const quizTitle = document.querySelector(".quiz-title");
  const quizForm = document.querySelector(".quiz-form");
  const result = document.querySelector(".score-result");
  quizTitle.innerText = quiz.title;
  quizForm.innerHTML = "";
  result.innerText = "";

  quiz.questions.forEach((q, i) => {
    const box = document.createElement("div");
    box.className = "question-box";
    const qText = document.createElement("p");
    qText.className = "question-text";
    qText.innerText = `${i + 1}. ${q.question}`;
    box.appendChild(qText);

    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option-label";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = opt;
      label.appendChild(input);
      label.append(" " + opt);
      box.appendChild(label);
    });

    quizForm.appendChild(box);
  });

  document.querySelector(".submit-btn").onclick = () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="question-${i}"]:checked`);
      if (selected && selected.value === q.answer) score++;
    });

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    const resultText = `${score} / ${quiz.questions.length}`;
    users[userIndex].scores.push({ quizTitle: quiz.title, score: resultText });
    localStorage.setItem("users", JSON.stringify(users));
    result.innerText = `You scored ${resultText}! 🎉`;
  };
}


function showDashboard() {
  authSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  const list = document.querySelector(".user-list");
  list.innerHTML = "";
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    const title = document.createElement("h3");
    title.className = "user-name";
    title.innerText = `${user.name} (${user.email})`;
    card.appendChild(title);
    if (user.scores.length === 0) {
      card.appendChild(document.createElement("p")).innerText = "No scores yet.";
    } else {
      user.scores.forEach(score => {
        card.appendChild(document.createElement("p")).innerText = `${score.quizTitle}: ${score.score}`;
      });
    }
    list.appendChild(card);
  });
}


const savedUser = JSON.parse(localStorage.getItem("currentUser"));
if (savedUser) {
  if (savedUser.email === "admin@quiz.com") showDashboard();
  else showHome(savedUser);
}
