const questions = [
    {
        "question": "What does HTML stand for?",
        "choices": [
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "None of these"
        ],
        "correctAnswer": 2
    },
    {
        "question": "Which of the following element is responsible for making the text bold in HTML?",
        "choices": [
            "<pre>",
            "<a>",
            "<b>",
            "<br>"
        ],
        "correctAnswer": 2
    },
    {
        "question": "Which of the following tag is used for inserting the largest heading in HTML?",
        "choices": [
            "<h3>",
            "<h6>",
            "<h5>",
            "<h1>"
        ],
        "correctAnswer": 3
    },
    {
        "question": "Which of the following tag is used to insert a line-break in HTML?",
        "choices": [
            "<br>",
            "<a>",
            "<pre>",
            "<b>"
        ],
        "correctAnswer": 0
    },
    {
        "question": "Which of the following tag is used to make the underlined text?",
        "choices": [
            "<i>",
            "<u>",
            "<ul>",
            "<pre>"
        ],
        "correctAnswer": 1
    }
]
var timeLeft = 60;
var maxTime = 60;
var timer;
var score = 0;
let currentQuestionIndex = 0;

$(document).ready(function () {
    $('#timer').text("Time: " + timeLeft);
    $("#start-quiz").on("click", startQuiz);
});

function startQuiz() {
    $("#welcome").hide();
    displayQuiz();
     //call function to start the timer
    if(!timer) {
        timer = window.setInterval(timePasses, 1000);
    }
}

function displayQuiz() {
    $("#quiz").show();
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    $("#question").text(questions[currentQuestionIndex].question);
    $("#choice-a").text(questions[currentQuestionIndex].choices[0]);
    $("#choice-b").text(questions[currentQuestionIndex].choices[1]);
    $("#choice-c").text(questions[currentQuestionIndex].choices[2]);
    $("#choice-d").text(questions[currentQuestionIndex].choices[3]);
}

/**
 * 
 * @param {int} choice index of the answer picked
 */
function pickAnswer(choice) {
    if (choice === questions[currentQuestionIndex].correctAnswer) {
        score++;
    } else {
        timeLeft -= 5;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    // if i am at the end, display score
    if (currentQuestionIndex === questions.length) {
        displayScore();
    } else {
        // display next question
        displayCurrentQuestion();
    }
}

function displayScore() {
    clearInterval(timer);
    $("#quiz").hide();
    $("#score").show();
    $("#user-score").text(score);
}

function timePasses() {
    if (timeLeft > 0) {
        timeLeft--;
        $('#timer').text("Time: " + timeLeft);
    } else {
        displayScore();
    }
}

function saveScore() {
    const name = $("#username").val();
    localStorage.setItem(name, score);
    displayHighscores();
}

function clearLocalStorage() {
    localStorage.clear();
    $("#highscores").hide();
}

function displayHighscores() {

    $("#welcome").hide();
    $("#score").hide();
    $("#scoreboard").show();

    let userScoresList = [];

    for (let i = 0; i < localStorage.length; i++) {
        let initials = localStorage.key(i);
        let userScore = localStorage.getItem(initials);
        userScoresList.push({ name: initials, score: userScore });
    }

    let sortedScores = userScoresList.sort(function (a, b) {
        return b.score - a.score;
    });

    for (let i = 0; i < sortedScores.length; i++) {
        $('#highscores').append(
            $('<li>').prop({
                innerHTML: sortedScores[i].name + ' : ' + sortedScores[i].score,
            })
        );
    }
}