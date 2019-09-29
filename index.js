let correctCount = 0;
let incorrectCount = 0;
let questionIndex = 0;
let currentView;


function anyButtonListen(){
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
            correctCount = 0;
            incorrectCount = 0;
            questionIndex = 0;
        }
    })
}

function loadStart () {
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
    currentView = 'question'

    $('main').html(`
<section class="js-question container" data-page="question">
    <form class="js-form" data-page="question">
        <fieldset>
            <legend>Question #${questionIndex + 1} - ${QUESTIONS[questionIndex].question} </legend>
            <div class="${QUESTIONS[questionIndex].ANSWERS[0].correct}">
                <input type="radio" name="answer" id="ans1" value="${QUESTIONS[questionIndex].ANSWERS[0].correct}"/>
                <label for="ans1">${QUESTIONS[questionIndex].ANSWERS[0].ans}<label>
            </div>
            <div class="${QUESTIONS[questionIndex].ANSWERS[1].correct}">
                <input type="radio" name="answer" id="ans2" value="${QUESTIONS[questionIndex].ANSWERS[1].correct}"/>
                <label for="ans2">${QUESTIONS[questionIndex].ANSWERS[1].ans}<label>
            </div>
            <div class="${QUESTIONS[questionIndex].ANSWERS[2].correct}">
                <input type="radio" name="answer" id="ans3" value="${QUESTIONS[questionIndex].ANSWERS[2].correct}"/>
                <label for="ans3">${QUESTIONS[questionIndex].ANSWERS[2].ans}<label>
            </div>
            <div class="${QUESTIONS[questionIndex].ANSWERS[3].correct}">
                <input type="radio" name="answer" id="ans4" value="${QUESTIONS[questionIndex].ANSWERS[3].correct}"/>
                <label for="ans4">${QUESTIONS[questionIndex].ANSWERS[3].ans}<label>
            </div>
            <button type="submit" class="js-btn js-submit">Submit</button>
        </fieldset>
    </form>
</section>
<footer class="container">
    <h3 class="score">Your score:</h3>
    <p>${correctCount} correct, ${incorrectCount} incorrect</p>
</footer>`)
}

function checkAnswerCorrect(){
//check to see if user's input is correct or not by taking it's 
    let answerVal = $('input[name=answer]:checked').val()
    if (!answerVal){
        alert('Must make a selection.')
    } else if (answerVal === "true"){
        currentView = 'correct'
        let trueOrFalse = true;
        updateScore(trueOrFalse)
    } else{
        currentView = 'incorrect'
        let trueOrFalse = false;
        updateScore(trueOrFalse)
    }
}
function giveFeedback(isCorrect){
//call checkAnswerCorrect() function to find out whether or not user was correct
//if the answer was correct, highlight user's answer in green box with light green background and tell user "correct!". Then add 1 to correctCount variable by calling updateScore (true)
//if the answer was incorrect,highlight user's answer in red box with light red background and tell user "sorry, that is wrong!" and highlight correct answer in green box with light green background. Then add 1 to incorrectCount variable by calling updateScore (false)

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
//if isCorrect = true, correct++ else, incorrect++
    isCorrect ? correctCount++ : incorrectCount++;
    $('footer').html(`<h3 class="score">Your score:</h3>
    <p>${correctCount} correct, ${incorrectCount} incorrect</p>`)
}
function updateQuestionIndex(){
    questionIndex++;
}
function loadResults(){
    currentView = 'results'
    $('main').html(`
    <section class="js-results container" data-page="finish" >
        <h2>You've completed the quiz!</h2>
        <p>You got ${correctCount} out of 10 questions correct!</p>
        <p>Do you want to try again?</p>
        <button class="js-btn js-start-over">Start Over</button>
    </section>`)
}
$(() => {
    loadStart();
    anyButtonListen();
})

// loadStart>loadQuestion>checkAnswerCorrect>giveFeedback>load next question or loadResults