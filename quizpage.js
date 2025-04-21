const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const quizIndex = localStorage.getItem("currentQuizIndex");

if (!currentUser) {
    window.location.href = "index.html";
}

const quizForm = document.querySelector(".quiz-form");
const submitButton = document.querySelector(".submit-btn");
const scoreParagraph = document.querySelector(".score-result");
const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
const selectedQuiz = quizzes[quizIndex];

document.querySelector(".quiz-title").innerText = selectedQuiz.title;

selectedQuiz.questions.forEach(function (questionObj, questionIndex) {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-box");
    
    const questionText = document.createElement("p");
    questionText.classList.add("question-text");
    questionText.innerText = (questionIndex + 1) + ". " + questionObj.question;
    questionContainer.appendChild(questionText);