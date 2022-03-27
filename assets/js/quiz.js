// TO DO
// Add real questions


// Variables
var score = 0;
var startTime = 60;
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
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 2",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 3",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 4",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 5",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 6",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 7",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 8",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 9",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 10",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 11",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 12",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 13",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 14",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 15",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 16",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 17",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 18",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 19",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    },
    {
        question: "Question 20",
        options: ["Wrong1", "Wrong2", "Correct", "Wrong3"],
        correct: "Correct"
    }
];
var currentQuestion = 0;
var finalQuestion = questions.length -1;

var highScores = [];
var maxHighScores = 15;




// Functions
// Correct Answer - increment score and show correct banner
function correctAnswer() {
    // Update score
    score++;
    scoreEl.innerText = score;

    // Display correct in the result div
    resultEl.innerHTML = "<p> Correct! </p>";
    resultEl.classList.add("result");

    // Increment current question if it is not the final question
    if (currentQuestion != finalQuestion) {
        currentQuestion++;
    }
    // If current question is the final question, end the game
    else {
        // Bonus for completing all questions before time ran out
        score++;
        scoreEl.innerText = score;
        endGame();
        return;
    }

    // Small delay for user to see that the answer was correct
    if (time > 1.25) {
        setTimeout(function() {
            displayQuestion()
        }, 250);
    }
    else {
        displayQuestion()
    }
}

// Wrong Answer - reduce time and show wrong banner
function wrongAnswer() {
    // Update time if more than 5 seconds remain
    if (time > 5) {
        time = time - 5;
        countdownEl.innerText = time;
    }
    // End game if 5 seconds or less remain
    else {
        time = 0;
        countdownEl.innerHTML = time;
        endGame();
        return;
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

    // Randomize answer option order
    q.options = q.options.sort(function() {
        return Math.random() - 0.5
    });

    // Create buttons for all options and add to options div with event listeners
    for (i = 0; i < q.options.length; i++) {
        var option = document.createElement("button");
        option.classList.add("option");
        option.innerText = q.options[i];
        option.setAttribute("optionId", i);
        option.addEventListener("click", evaluateAnswer);
        optionsEl.appendChild(option);
    }
}

// Randomize question order
function randomQs() {
    questions = questions.sort(function() {
        return Math.random() - 0.5
    });
}

// Add to high scores
function addHighScore(event) {
    // Block page refresh on submit
    event.preventDefault();

    // Refresh the high scores list
    loadHighScores();
    
    // Add values for initial to a variable
    var initials = document.querySelector("input[name='playerInitials']").value;

    // Check for empty initials
    if (!initials) {
        alert("Please enter initials");
        return;
    }

    // package up as an object
    var highScore = {
        playerInitials: initials,
        playerScore: score
    }

    // push new score to high scores array if it is a high score (save up to 20)
    var scoreItems = highScores.length;
    var lowestScore = highScores[scoreItems - 1];

    if (highScores.length < maxHighScores) {
        highScores.push(highScore);
    }
    else if (highScore.playerScore > lowestScore.playerScore) {
        highScores.push(highScore);
    }
    
    // Sort from largest to smallest
    highScores = highScores.sort(function(a, b) {
        return b.playerScore - a.playerScore;
    });

    // If more high scores than max saved, delete lowest score
    if (highScores.length > maxHighScores) {
        highScores.length = maxHighScores;
    }
    
    saveHighScores();

    window.location.href="./high-scores.html"
}

function saveHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores))
};

function loadHighScores() {
    // get from localStorage
    var savedScores = localStorage.getItem("highScores");

    // stop if no high scores in localStorage
    if (!savedScores) {
        return;
    }

    // turn the string back into an array
    highScores = JSON.parse(savedScores);

    console.log(highScores);
}

// Create high score entry UI and enter high score 
function scoreEntry() {
    var scoreContainer = document.createElement("form");
    scoreContainer.classList.add("score-form");
    optionsEl.appendChild(scoreContainer);

    var scoreLabel = document.createElement("label");
    scoreLabel.setAttribute("for", "playerInitials");
    scoreLabel.innerText = "Enter your initials:";
    scoreContainer.appendChild(scoreLabel);

    var scoreInput = document.createElement("input");
    scoreInput.setAttribute("type", "text");
    scoreInput.setAttribute("name", "playerInitials");
    scoreContainer.appendChild(scoreInput);

    var scoreSubmit = document.createElement("button");
    scoreSubmit.innerText = "Submit";
    scoreSubmit.addEventListener("click", addHighScore);
    scoreContainer.appendChild(scoreSubmit);
}

// End Game
function endGame() {
    clearInterval(intervalId);
    time = startTime;

    questionEl.innerText = "All done!";
    optionsEl.innerHTML = "<p> Your final score is " + score + ". </p>";
    resultEl.innerHTML = "";

    scoreEntry();
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
    randomQs();
    startTimer();
    displayQuestion();
}



// Callbacks!!!
startBtnEl.addEventListener("click", startGame);