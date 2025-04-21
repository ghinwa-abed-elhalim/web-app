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
    
    questionObj.options.forEach(function (optionValue) {
        const label = document.createElement("label");
        label.classList.add("option-label");
        
        const optionInput = document.createElement("input");
        optionInput.setAttribute("type", "radio");
        optionInput.setAttribute("name", "question-" + questionIndex);
        optionInput.setAttribute("value", optionValue);
        
        label.appendChild(optionInput);
        label.appendChild(document.createTextNode(optionValue));
        
        questionContainer.appendChild(label);
    
    });
    
    quizForm.appendChild(questionContainer);
});


submitButton.addEventListener("click", function () {
    let score = 0;
    
    selectedQuiz.questions.forEach(function (questionObj, questionIndex) {
        const selectedOption = document.querySelector(
            'input[name="question-' + questionIndex + '"]:checked'
        );
        
        if (selectedOption && selectedOption.value === questionObj.answer) {
            score += 1;
        
        }
    });
    
    const total = selectedQuiz.questions.length;
    const finalScore = `${score} / ${total}`;
    scoreParagraph.innerText = `You scored ${finalScore}! 🎉`;
    
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
        users[userIndex].scores.push({
        quizTitle: selectedQuiz.title,
        score: finalScore
    
    });
    
    localStorage.setItem("users", JSON.stringify(users));
}

submitButton.disabled = true;
});