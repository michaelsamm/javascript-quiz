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

    // Increment current question if it is not the final question
    if (currentQuestion != finalQuestion) {
        currentQuestion++;
    }
    // If current question is the final question, end the game
    else {
        endGame();
        return;
    }

    // Small delay for user to see that the answer was correct
    setTimeout(function() {
        displayQuestion()
     }, 250);
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
    console.log(q.options);

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
    console.log(questions);
}

// Add to high scores
function addHighScore(event) {
    // Block page refresh on submit
    event.preventDefault();
    
    // Add values for initial to a variable
    var initials = document.querySelector("input[name='playerInitials']").value;

    // Check for empty initials
    if (!initials) {
        alert("Please enter initials");
    }

    // package up as an object
    var highScore = {
        playerInitials: initials,
        playerScore: score
    }

    // push new score to high scores array if it is a high score


    highScores.push(highScore);

    console.log(highScores);

    saveHighScores();
}

function saveHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores))
};

function loadHighScores() {
    // get from localStorage
    var savedScores = localStorage.getItem("highScores");

    highScores = JSON.parse(savedScores);

    // Sort from largest to smallest
    highScores.sort(function(a, b) {
        return a.score - b.score;
    });
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
    loadHighScores();
    randomQs();
    startTimer();
    displayQuestion();
}



// Callbacks!!!
startBtnEl.addEventListener("click", startGame);