// 1. Questions Array
const questions = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<css>", "<script>", "<style>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: "font-size"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "msgBox('Hello World');",
            "alert('Hello World');",
            "msg('Hello World');",
            "alertBox('Hello World');"
        ],
        answer: "alert('Hello World');"
    },
    {
        question: "Which HTML5 semantic tag is typically used for the bottom section of a page?",
        options: ["<bottom>", "<section>", "<footer>", "<aside>"],
        answer: "<footer>"
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timer;
const TIME_PER_QUESTION = 15;
let timeLeft = TIME_PER_QUESTION;

// DOM Elements
const questionProgressEl = document.getElementById("question-progress");
const timerBoxEl = document.getElementById("timer-box");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");

// 2. shuffleQuestions(): Randomly shuffles the questions array
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// 3. startTimer(): Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timer);
    timeLeft = TIME_PER_QUESTION;
    timeLeftEl.textContent = timeLeft;
    timerBoxEl.classList.remove("warning");

    timer = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 5) {
            timerBoxEl.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Helper for when time runs out before submitting
function handleTimeOut() {
    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.classList.remove("hidden");
    feedbackSectionEl.className = "feedback-incorrect";
    feedbackTextEl.textContent = `Time's up! The correct answer was: ${currentQuestion.answer}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
    selectedOption = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSectionEl.classList.add("hidden");

    const currentQuestion = questions[currentQuestionIndex];
    questionProgressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTextEl.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainerEl.innerHTML = "";

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            // Remove 'selected' class from all buttons
            document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
            // Highlight clicked button
            button.classList.add("selected");
            selectedOption = option;
            submitBtn.disabled = false;
        });

        optionsContainerEl.appendChild(button);
    });
}

// 5. checkAnswer(): Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");

    // Disable all option buttons after submission
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption && selectedOption !== currentQuestion.answer) {
            btn.classList.add("incorrect");
        }
    });

    feedbackSectionEl.classList.remove("hidden");

    if (selectedOption === currentQuestion.answer) {
        score++;
        feedbackSectionEl.className = "feedback-correct";
        feedbackTextEl.textContent = "Correct! Great job.";
    } else {
        feedbackSectionEl.className = "feedback-incorrect";
        feedbackTextEl.textContent = `Incorrect. The correct answer is: ${currentQuestion.answer}`;
    }

    scoreDisplayEl.textContent = `Current Score: ${score}`;
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;
    scoreDisplayEl.textContent = `Current Score: ${score}`;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        showFinalResults();
    }
}

// Helper to display final screen when quiz finishes
function showFinalResults() {
    clearInterval(timer);
    questionProgressEl.textContent = "Quiz Completed!";
    timerBoxEl.classList.add("hidden");
    questionTextEl.textContent = `You finished the quiz!`;
    optionsContainerEl.innerHTML = "";

    feedbackSectionEl.classList.remove("hidden");
    feedbackSectionEl.className = "feedback-correct";
    feedbackTextEl.textContent = `Final Score: ${score} out of ${questions.length} (${Math.round((score / questions.length) * 100)}%)`;
    
    scoreDisplayEl.textContent = `Final Score: ${score} / ${questions.length}`;
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
}

// 7. startQuiz(): Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplayEl.textContent = `Current Score: ${score}`;
    timerBoxEl.classList.remove("hidden");
    restartBtn.classList.add("hidden");

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Initialize Quiz on Page Load
startQuiz();