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

var winImages = ["assets/images/correct2.gif", "assets/images/right.gif", "assets/images/win.gif", "assets/images/yeah.gif"];
var lossImages = ["assets/images/wrong.gif", "assets/images/giphy.gif", "assets/images/oops.gif", "assets/images/nope.gif"];

var currentQuestion = [];
var correct = 0;
var lost = 0;
var index = 0;
var number = 30;
var intervalId;

function display() {
    currentQuestion = questions[index];
    console.log(currentQuestion);
    $("#game").html("<h5>" + currentQuestion.question + "</h5>");
    //Display question and choice

    //Create dynamic button and set choices value for each

    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c1}">` + "<h3>" + currentQuestion.c1 + "</h3></button>" + "<br>");
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c2}">` + "<h3>" + currentQuestion.c2 + "</h3></button>" + `<br>`);
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c3}">` + "<h3>" + currentQuestion.c3 + "</h3></button>" + "<br>");
    $("#game").append(`<button class="btn-outline-success choice" data-choice="${currentQuestion.c4}">` + "<h3>" + currentQuestion.c4 + "</h3></button>" + "<br>");


}


$(document).on("click", ".choice", function() {

    validateAnswer($(this).attr('data-choice'));
});

function validateAnswer(answer) {
    stop();

    var correctAnswer = currentQuestion.answer;
    if (correctAnswer === answer) {
        correct++;

        console.log("Correct answer");
        setTimeout(function() {
            nextQuestion();
        }, 3000);
        $("#game").empty();
        $("#game").html("<h5> Correct! </h5>");
        $("#game").append(`<img src="${randomImages(winImages)}"/>`);



    } else {

        lost++;
        console.log("Not Correct answer");
        setTimeout(function() {
            nextQuestion();
        }, 3000);
        $("#game").empty();
        $("#game").html("<h5>" + "Nope!" + "</h5>");
        $("#game").append("<h5>" + "The correct answer was : " + currentQuestion.answer + "</h5>");
        $("#game").append(`<img src="${randomImages(lossImages)}"/>`);

    }


}

function nextQuestion() {
    if (index < questions.length - 1) {
        index++;
        reset()
        display();
    } else {

        displayStatus();
        //index = 0;
        //reset();
        //display();
    }
}



//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #timer tag.
    $("#timer").html("Time Remaining: " + number + " seconds");


    //  Once number hits zero...
    if (number === 0) {

        $("#game").empty();
        $("#game").html("<h5>" + "Out of Time" + "</h5>");
        $("#game").append("<h5>" + "The correct answer was : " + currentQuestion.answer + "</h5>");
        $("#game").append(`<img src="assets/images/mamaAfrica.gif"/>`);
        stop();
        setTimeout(function() {
            nextQuestion();
        }, 3000);

    }
}

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//Add all relevant timer functions with associated global variables
function stop() {
    clearInterval(intervalId);

}

function reset() {
    number = 30;
    run();
}


function displayStatus() {
    var unanswered = questions.length - (correct + lost);
    $("#game").empty();
    $("#game").html("<h4>" + "All done, here is how you did!" + "</h4>");
    $("#game").append("<h5>" + "Correct Answers: " + correct + "</h5>");
    $("#game").append("<h5>" + "Incorrect Answers: " + lost + "</h5>");
    $("#game").append("<h5>" + "Unanswered: " + unanswered + "</h5>");
    $("#game").append("<button class= 'btn-outline-success btn-lg replay'><h2>Start Over?</2></button>");

}


function randomImages(images) {
    var random = Math.floor(Math.random() * images.length);
    return images[random];
}
$(document).on("click", ".replay", function() {
    currentQuestion = [];
    correct = 0;
    lost = 0;
    index = 0;
    intervalId;
    reset();
    display();
});

$(".start").on("click", function() {
    $(".start").remove();
    run();
    display();


});