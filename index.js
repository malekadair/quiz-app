let correctCount = 0;
let incorrectCount = 0;
let questionIndex = 0;
let currentView;


function loadStart () {
    currentView = 'start';

    $('main').html(`
    <section class="js-start" data-page="start">
        <h2>Are you a Pool-Shark?</h2>
        <p>In this quiz, we're going to test your knowledge on the game of Billiards.</p>
        <p>Are you ready to get started?</p>
        <button class="js-btn">Start Quiz</button>
    </section>`)
    
}

function buttonListen(){
    $('main').on('click','.js-btn', function(e){
        // if (typeof e.cancelable !== 'boolean' || e.cancelable) {
        //     // The event can be canceled, so we do so.
        //     e.preventDefault();
        loadQuestion()
    })
}

function loadQuestion () {
    currentView = 'question'
    

    // alert('load question')
    // $('main').html(`<p>we did it</p>`)
    $('main').html(`<section class="js-question" data-page="question">
    <form class="js-form" data-page="question">
        <fieldset>
            <legend>Question #${questionIndex + 1} </legend>
            <div>
                <input type="radio" name="answer" id="ans1" value="answer1"/>
                <label for="answer1">answer<label>
            </div>
            <div>
                <input type="radio" name="answer" id="ans2" value="answer2"/>
                <label for="answer2">answer<label>
            </div>
            <div>
                <input type="radio" name="answer" id="ans3" value="answer3"/>
                <label for="answer3">answer<label>
            </div>
            <div>
                <input type="radio" name="answer" id="ans4" value="answer4"/>
                <label for="answer4">answer<label>
            </div>
            <button type="submit" class="btn js-submit">Submit</button>
        </fieldset>
    </form>
</section>
<footer>
    <h3 class="score">Your score:</h3>
    <p>6 correct, 3 incorrect</p>
</footer>`)
}

function checkAnswerCorrect(){
//check to see if user's input is correct or not by taking it's 
}
function giveFeedback(){
    checkAnswerCorrect();
//call checkAnswerCorrect() function to find out whether or not user was correct
//if the answer was correct, highlight user's answer in green box with light green background and tell user "correct!". Then add 1 to correctCount variable by calling updateScore (true)
//if the answer was incorrect,highlight user's answer in red box with light red background and tell user "sorry, that's incorrect!" and highlight correct answer in green box with light green background. Then add 1 to incorrectCount variable by calling updateScore (false)
}
function updateScore(isCorrect){
//if isCorrect = true, correct++ else, incorrect++
}
function updateQuestionIndex(){
//questionIndex++
}
function loadResults(){
    $('main').html(`
    <section class="js-results" data-page="finish" >
        <h2>You've completed the quiz!</h2>
        <p>You got ${correctCount} out of 10 questions correct!</p>
        <p>Do you want to try again?</p>
        <button class="btn js-start-over">Start Over</button>
    </section>`)
}
$(() => {
    loadStart();
    buttonListen();
})