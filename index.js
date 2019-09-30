let correctCount = 0;
let incorrectCount = 0;
let questionIndex = 0;
let currentView;

function anyButtonListen(){
//depending on the current "view", the button will call different functions when pressed.
    $('main').on('click','.js-btn', function(e){
        e.preventDefault()

        if (currentView === 'start'){
            loadQuestion()
        } else if (currentView === 'question') {
            checkAnswerCorrect()
            if (currentView === 'correct'){
                giveFeedback(true)
            } else {
                giveFeedback(false)
            }
        } else if (currentView === 'feedback') {
            questionIndex === QUESTIONS.length 
                ? loadResults() 
                : loadQuestion();
        } else {
            loadStart()
        }
    })
}
function disableForm(){
//this function will disallow user from changing selection while receiving feedback on their submitted answer
    $('input').prop('disabled', true)
}

function resetVariables(){
//will set all counters back to 0
    correctCount = 0;
    incorrectCount = 0;
    questionIndex = 0;
}

function loadStart () {
//will render start screen at initial loading of program, or if user opts into restarting the quiz.
    resetVariables()
    currentView = 'start';

    $('main').html(`
    <section class="js-start container" data-page="start">
        <h2>Are you a Pool-Shark?</h2>
        <p>In this quiz, we're going to test your knowledge on the game of Billiards.</p>
        <p>Are you ready to get started?</p>
        <button class="js-btn">Start Quiz</button>
    </section>`)
}

function loadQuestion () {
//builds the HTML based on data pulled from questions.js file. Then sets it to the <main>'s HTML 
    currentView = 'question'
    let answerArray = QUESTIONS[questionIndex].ANSWERS

    $('main').html(`
<section class="js-question container" data-page="question">
    <form class="js-form" data-page="question">
        <fieldset>
            <legend>Question #${questionIndex + 1} - ${QUESTIONS[questionIndex].question} </legend>
            <div class="${answerArray[0].correct}">
                <input type="radio" name="answer" id="ans1" value="${answerArray[0].correct}"/>
                <label for="ans1">${answerArray[0].ans}<label>
            </div>
            <div class="${answerArray[1].correct}">
                <input type="radio" name="answer" id="ans2" value="${answerArray[1].correct}"/>
                <label for="ans2">${answerArray[1].ans}<label>
            </div>
            <div class="${answerArray[2].correct}">
                <input type="radio" name="answer" id="ans3" value="${answerArray[2].correct}"/>
                <label for="ans3">${answerArray[2].ans}<label>
            </div>
            <div class="${answerArray[3].correct}">
                <input type="radio" name="answer" id="ans4" value="${answerArray[3].correct}"/>
                <label for="ans4">${answerArray[3].ans}<label>
            </div>
            <button type="submit" class="js-btn js-submit">Submit</button>
        </fieldset>
    </form>
</section>
<footer class="container">
    <h3 class="score">Your score: ${correctCount}</h3>
    <p>Question ${questionIndex + 1} of ${QUESTIONS.length}</p>
</footer>`)
}

function checkAnswerCorrect(){
//checks to see if user's input is correct or incorrect and calling updateScore function. Also disables the radio button inputs until the user has moved onto the next question.
    let answerVal = $('input[name=answer]:checked').val()
    if (!answerVal){
        alert('You must make a selection.');
    } else if (answerVal === "true"){
        currentView = 'correct'
        let trueOrFalse = true;
        updateScore(trueOrFalse)
    } else{
        currentView = 'incorrect'
        let trueOrFalse = false;
        updateScore(trueOrFalse)
    }
    disableForm()
}

function giveFeedback(isCorrect){
//give's user feedback as to whether or not they answered correctly. If correct, their answer will be highlited in green. If incorrect, their answer will be highlighted in red and the correct answer will be highlighted in green. 
//Also changes the text of the button once they have reached the final question.
//and calls function to add 1 to index

    currentView = 'feedback'

    if (isCorrect){
        $('div .true').css('background-color', '#baffba').css('border', 'green solid 2px').css('border-radius', '4px')
        $('div .true').append('<p class="pCorrect">Correct!</p>')
    } else {
        $('input[name=answer]:checked').closest('div').css('background-color', '#ffcbc7').css('border', 'red solid 2px').css('border-radius', '4px')
        $('input[name=answer]:checked').closest('div').append('<p class="pIncorrect">Sorry, that is Wrong.</p>')

        $('div .true').css('background-color', '#baffba').css('border', 'green solid 2px').css('border-radius', '4px')
        $('div .true').append('<p class="pCorrect">This is the Correct Answer.</p>')
    }
    $('div .true').css('background-color', '#baffba').css('border', 'green solid 2px').css('border-radius', '4px')

    if (questionIndex == QUESTIONS.length -1){
        $('.js-form button').text('See Results')
    } else{
        $('.js-form button').text('Next Question')
    }

    updateQuestionIndex()
}
function updateScore(isCorrect){
//updates the variables used to keep track of the user's score throughout the quiz. If they answered correctly, correctCount++. If incorrect, incorrectCount++
    isCorrect ? correctCount++ : incorrectCount++;
    $('footer').html(`<h3 class="score">Your score: ${correctCount}</h3>
    <p>Question ${questionIndex + 1} of ${QUESTIONS.length}</p>`)
}
function updateQuestionIndex(){
//adds one to questionIndex Variable
    questionIndex++;
}
function loadResults(){
//will load results which displays the user's final score after completing all questions.
    currentView = 'results'
    $('main').html(`
    <section class="js-results container" data-page="finish" >
        <h2>You've completed the quiz!</h2>
        <p>You got ${correctCount} out of ${QUESTIONS.length} questions correct!</p>
        <p>Do you want to try again?</p>
        <button class="js-btn js-start-over">Start Over</button>
    </section>`)
}
$(() => {
//loads appropriate functions once program is ready.
    loadStart();
    anyButtonListen();
})

//expected sequence: loadStart>loadQuestion>checkAnswerCorrect>giveFeedback>load next question or loadResults