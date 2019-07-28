//create array of questions with question, 4 choices as c1, c2, c3, c4 and the correct anawer as answer
var questions = [{
        "question": "Which city has the largest population in Africa?",
        "c1": "Lagos",
        "c2": "Cairo",
        "c3": "Accra",
        "c4": "Cape Town",
        "answer": "Lagos"
    },
    {
        "question": "Which one is the largest desert (non-polar) in the world?",
        "c1": "Thar",
        "c2": "Namib",
        "c3": "Sahara",
        "c4": "Mojave",
        "answer": "Sahara"
    },
    {
        "question": "All of these countries are located in the Horn of Africa except?",
        "c1": "Senegal",
        "c2": "Ethiopia",
        "c3": "Djibouti",
        "c4": "Somalia",
        "answer": "Senegal"
    },
    {
        "question": "How many countries are in Africa?",
        "c1": "20",
        "c2": "35",
        "c3": "40",
        "c4": "54",
        "answer": "54"
    },
    {
        "question": "Where is the great Pyramid of Giza located?",
        "c1": "Egypt",
        "c2": "Libya",
        "c3": "Malawi",
        "c4": "South Africa",
        "answer": "Egypt"
    },
    {
        "question": "Which country is not in Africa?",
        "c1": "Morocco",
        "c2": "Bulgaria",
        "c3": "Mali",
        "c4": "Egypt",
        "answer": "Bulgaria"
    },
    {
        "question": "Where is Victoria Fall located?",
        "c1": "Nigeria",
        "c2": "South Africa",
        "c3": "Between Kenya and Sudan border",
        "c4": "Between Zambia and Zimbabwe border",
        "answer": "Between Zambia and Zimbabwe border"
    },
    {
        "question": "Where is rock hewn churches of lalibela located?",
        "c1": "Cameroon",
        "c2": "Ethiopia",
        "c3": "Malawi",
        "c4": "Ghana",
        "answer": "Ethiopia"
    }

]

//Create two arrays of image
var winImages = ["assets/images/correct2.gif", "assets/images/right.gif", "assets/images/win.gif", "assets/images/yeah.gif"];
var lossImages = ["assets/images/giphy.gif", "assets/images/oops.gif", "assets/images/nope.gif"];

//global variables
var currentQuestion = [];
var correct = 0;
var lost = 0;
var index = 0;
var number = 30;
var intervalId;

//30 seconds timer for user to choose answer for each
function runTimer() {
    number = 30;
    intervalId = setInterval(decrement, 1000);
}

//function to stop timer
function stop() {
    clearInterval(intervalId);
}

//  The decrement function for counting down.
function decrement() {
    number--;

    //  Show the number in the #timer tag.
    $("#timer").html("Time Remaining: " + number + " Seconds");

    //  Once number hits zero remove the question and display time out message follwed by correct answer and gifhy
    if (number === 0) {
        stop();
        sleep();
        $("#game").empty();
        $("#game").html("<h5>" + "Out of Time" + "</h5>");
        $("#game").append("<h5>" + "The correct answer was : " + currentQuestion.answer + "</h5>");
        $("#game").append(`<img src="assets/images/mamaAfrica.gif"/>`);
    }
}

//Display timer, question and choices
function display() {
    runTimer();

    currentQuestion = questions[index];
    console.log(currentQuestion);

    //Display timer and question
    $("#timer").html("Time Remaining: " + number + " Seconds");
    $("#game").html("<h5>" + currentQuestion.question + "</h5>");

    //Create dynamic button and set choices value for each button.
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c1}">` + "<h3>" + currentQuestion.c1 + "</h3></button>" + "<br>");
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c2}">` + "<h3>" + currentQuestion.c2 + "</h3></button>" + "<br>");
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c3}">` + "<h3>" + currentQuestion.c3 + "</h3></button>" + "<br>");
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c4}">` + "<h3>" + currentQuestion.c4 + "</h3></button>" + "<br>");
}

//sleep the excution of display function with 3 seconds 
function sleep() {
    setTimeout(function() {
        nextQuestion();
    }, 3000);
}

//Display next question function
function nextQuestion() {

    //
    if (index < questions.length - 1) {
        index++;
        display();
    } else {
        displayStatus();
    }
}

//Event deligate to listen the click event.
$(document).on("click", ".choice", function() {

    //When the user answer questions, get user answer and pass it to answer validating function 
    validateAnswer($(this).attr('data-choice'));

});

//answer comparison function with logic
function validateAnswer(answer) {
    //Call stop() function to pause the timer.
    stop();

    //Store correct answer in a variable .
    var correctAnswer = currentQuestion.answer;

    //Compare correct answer with user answer if it matchs increase score and show win message and giphy.
    //Despite the result after the user answered, timer paused and there will be 3s timeout to show the result.
    if (correctAnswer === answer) {
        correct++;
        console.log("Correct answer");
        sleep();
        $("#game").empty();
        $("#game").html("<h5> Correct! </h5>");
        $("#game").append(`<img src="${randomImages(winImages)}"/>`);

        //otherwise wrong answer counter increase by 1 and show the correct answer and lost message and giphy.
    } else {
        lost++;
        console.log("Not Correct answer");
        sleep();
        $("#game").empty();
        $("#game").html("<h5>" + "Nope!" + "</h5>");
        $("#game").append("<h5>" + "The correct answer was : " + currentQuestion.answer + "</h5>");
        $("#game").append(`<img src="${randomImages(lossImages)}"/>`);
    }
}

//Generating random giphy for each answer accordingly.
function randomImages(images) {
    var random = Math.floor(Math.random() * images.length);
    return images[random];
}

//Shows the final result and display start over button.
function displayStatus() {
    var unanswered = questions.length - (correct + lost);
    $("#game").empty();
    $("#game").html("<h4>" + "All done, here is how you did!" + "</h4>");
    $("#game").append("<h5>" + "Correct Answers: " + correct + "</h5>");
    $("#game").append("<h5>" + "Incorrect Answers: " + lost + "</h5>");
    $("#game").append("<h5>" + "Unanswered: " + unanswered + "</h5>");
    $("#game").append("<button class= 'btn-outline-success btn-lg replay'><h2>Start Over?</2></button>");
}

//Event handler for start over button.
$(document).on("click", ".replay", function() {
    currentQuestion = [];
    correct = 0;
    lost = 0;
    index = 0;
    intervalId;
    display();
});

//Both timer and questions are wrapped up in start button. 
//When it is clicked the button will be replaced by the timer and game content.
$(".start").on("click", function() {
    $(".start").remove();
    $("#timer").html("Time Remaining: " + number + " Seconds");
    display();

});