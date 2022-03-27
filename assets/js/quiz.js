// Variables needed:
    // start time
    // time - for 
    // timer interval
    // Questions with answers????
        // **look up how to create questions
        // **designate a correct answer
        // **ensure correct answer is not in the same place
        // **randomize question order
        // **don't repeat a question
    


// Listener for start button
    // On click start time

// Swap out div with question
// swap out div with answer buttons??
// Add each answer option as li?? button??
// Click listener for each option
// Correct result
    // Add to score
    // Show 'correct'
    // Advance to next question
        // Swap question again
        // Swap button content again
// Incorrect result
    // Subtract time
    // Show 'incorrect'




// Variables

var score = 0;
var startTime = 15;
var time = startTime;
var intervalId;

var startBtnEl = document.getElementById("startBtn");
var countdownEl = document.getElementById("countdown");
var scoreEl = document.getElementById("score");
var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var resultEl = document.getElementById("result");
var containerEl = document.getElementById("container");

var questions = [
    {
        question: "Question 1",
        options: ["Wrong", "Wrong", "Correct", "Wrong"],
        correct: "Correct"
    },
    {
        question: "Question 2",
        options: ["Wrong", "Wrong", "Correct", "Wrong"],
        correct: "Correct"
    },
    {
        question: "Question 3",
        options: ["Wrong", "Wrong", "Correct", "Wrong"],
        correct: "Correct"
    }
];
var currentQuestion = 0;
var finalQuestion = questions.length -1;

var highScores = [];




// Functions
// Correct Answer - increment score and show correct banner
function correctAnswer() {
    // Update score
    score++;
    scoreEl.innerText = score;

    // Display correct in the result div
    resultEl.innerHTML = "<p> Correct! </p>";
    resultEl.classList.add("result");

    // Increment current question
    if (currentQuestion != finalQuestion) {
        currentQuestion++;
    }
    else {
        endGame();
    }

    setTimeout(function() {
        displayQuestion()
     }, 500);
}

// Wrong Answer - reduce time and show wrong banner
function wrongAnswer() {
    // Update time
    if (time >= 5) {
        time = time - 5;
        countdownEl.innerText = time;
    }

    else {
        time = 0;
        countdownEl.innerHTML = time;
        endGame()
    }

    // Display wrong in the result div
    resultEl.innerHTML = "<p> Try again! </p>";
    resultEl.classList.add("result");
}

// On click, check to see if the answer is correct
function evaluateAnswer(event) {
    var a = questions[currentQuestion].correct

    if (event.target.innerText === a) {
        event.target.classList.add("correct")
        correctAnswer();
    }

    else {
        event.target.classList.add("wrong");
        wrongAnswer();
    }
}

// Display question and answer options
function displayQuestion() {
    // Align columns left
    containerEl.classList.add("align-left")
    
    // Variable for the question
    var q = questions[currentQuestion];

    // Set the question text in the header
    questionEl.innerText = q.question;
    optionsEl.innerText = "";
    resultEl.innerHTML = "";

    // Create buttons for all options and add to options div with event listeners
    for (i = 0; i < q.options.length; i++) {
        var option = document.createElement("btn");
        option.classList.add("option");
        option.innerText = q.options[i];
        option.setAttribute("optionId", i);
        option.addEventListener("click", evaluateAnswer);
        optionsEl.appendChild(option);
    }
}

// End Game
function endGame() {
    clearInterval(intervalId);
    time = startTime; 
}

// Start Timer
function startTimer() {
    intervalId = setInterval(function() {
        time--
        countdownEl.innerText = time;
        if (time === 0) {
            endGame();
        }
    }, 1000);
}

// Start Game
function startGame() {
    startTimer();
    displayQuestion();
    console.log("Game Started");
}



// Callbacks!!!
startBtnEl.addEventListener("click", startGame);