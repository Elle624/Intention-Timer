var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var buttonText = document.querySelectorAll('.cat-titles')
var newActivitySection = document.querySelector('.new');
var currentActivitySection = document.querySelector('.current');
var startButton = document.querySelector('.start-button');
var startActivityBtn = document.querySelector('.start-activity-button');
var errorMsg = document.querySelectorAll('.error-message');
var displayMin = document.getElementById('user-minutes');
var displaySec = document.getElementById('user-seconds');
var congratMsg = document.querySelector('.message');
var displayUserTimer = document.querySelector('.user-timer');
var logButton = document.getElementById('log-button');
var cardSection = document.querySelector('.card-section');
var completedActivitySection = document.querySelector('.completed');
var createNewActivityBtn = document.querySelector('.new-activity-button');
var cardBorder = document.querySelector('.card-border');


studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
minutesInput.addEventListener('keyup', limitMin);
secondsInput.addEventListener('keyup', limitSec);
startActivityBtn.addEventListener('click', startActivity);
startButton.addEventListener('click', startCountDown);
logButton.addEventListener('click', logActivity);
createNewActivityBtn.addEventListener('click', createNewActivity);

function changeColor(button1, category1, button2, category2, button3, category3) {
    if (button2 == undefined) {
        button1.classList.add(category1);
    } else if (button3 == undefined) {
        button1.classList.add(category1);
        button2.classList.remove(category2);
    } else {
        button1.classList.add(category1);
        button2.classList.remove(category2);
        button3.classList.remove(category3);
    }
}

function changeStudyColor() {
    changeColor(studyButton, 'study-active', meditateButton, 'meditate-active', exerciseButton, 'exercise-active');
}

function changeMeditateColor() {
    changeColor(meditateButton, 'meditate-active', studyButton, 'study-active', exerciseButton, 'exercise-active');
}

function changeExerciseColor() {
    changeColor(exerciseButton, 'exercise-active', studyButton, 'study-active', meditateButton, 'meditate-active');
}

function limitTimeInput(timeInput, num) {
  preventInvalids(event, timeInput);
  timeInput.value = parseInt(timeInput.value);
  if (timeInput.value > num) {
      timeInput.value = num;
  }
}

function preventInvalids(event, inputField) {
    var invalidChars = ['+', '-', 'e', 'E'];
    for (var i = 0; i < invalidChars.length; i++) {
        if (event.key === invalidChars[i]) {
            event.preventDefault();
            inputField.value = '';
        }
    }
}

function limitMin() {
  limitTimeInput(minutesInput, 90)
}

function limitSec() {
  limitTimeInput(secondsInput, 59)
}

function createCurrentActivity() {
    changeColor(newActivitySection,'hidden', currentActivitySection, 'hidden');
    if (studyButton.classList.contains('study-active')) {
        createInstance('study-active');
        changeColor(startButton,'study-circle');
    } else if (meditateButton.classList.contains('meditate-active')) {
        createInstance('meditate-active');
        changeColor(startButton,'meditate-circle');
    } else if (exerciseButton.classList.contains('exercise-active')) {
        createInstance('exercise-active');
        changeColor(startButton,'exercise-circle');
    }

}

function createInstance(activeClass) {
    for (var i = 0; i < buttonText.length; i++) {
        if (buttonText[i].parentNode.classList.contains(activeClass)) {
            currentActivity = new Activity (
                buttonText[i].innerText,
                accomplishInput.value,
                minutesInput.value,
                secondsInput.value
                );
        }
    }
}

function isCatChosen(btn1, btn2, btn3) {
  if (!btn1.classList.contains('study-active') &&
  !btn2.classList.contains('meditate-active') &&
  !btn3.classList.contains('exercise-active')) {
    errorMsg[0].classList.remove('hidden');
  } else {
    errorMsg[0].classList.add('hidden');
  }
}

function areInputsDefined(userInputs) {
  for (var i = 0; i < userInputs.length; i++) {
    if (userInputs[i].value === '') {
      errorMsg[i + 1].classList.remove('hidden');
    } else {
      errorMsg[i + 1].classList.add('hidden');
    }
  }
}

function displayTimeSection() {
    document.getElementById('user-accomplish').innerText = currentActivity.description;
    currentActivity.minutes < 10 ? displayMin.innerText = `0${currentActivity.minutes}` : displayMin.innerText = currentActivity.minutes;
    currentActivity.seconds < 10 ? displaySec.innerText = `0${currentActivity.seconds}` : displaySec.innerText = currentActivity.seconds;
}

function startActivity() {
  var inputs = [accomplishInput, minutesInput, secondsInput];
  isCatChosen(studyButton, meditateButton, exerciseButton);
  areInputsDefined(inputs);
  if (errorMsg[0].classList.contains('hidden') &&
  errorMsg[1].classList.contains('hidden') &&
  errorMsg[2].classList.contains('hidden') &&
  errorMsg[3].classList.contains('hidden')) {
    createCurrentActivity();
    displayTimeSection();
  }
}
function displayCongratMsg(msg) {
  changeColor(displayUserTimer, 'hidden', congratMsg, 'hidden');
  congratMsg.innerText = msg;
}

function startCountDown() {
  var totalSeconds = currentActivity.startTimer();
  if (totalSeconds > 0) {
    var interval = setInterval(updateCountDown, 1000);
    function updateCountDown() {
        totalSeconds--
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds % 60);
        minutes < 10 ?  displayMin.innerText = `0${minutes}` : displayMin.innerText = minutes;
        seconds < 10 ?  displaySec.innerText = `0${seconds}` : displaySec.innerText = seconds;
        if (totalSeconds <= 0) {
          clearInterval(interval);
          displayCongratMsg('Congrats!!! Great Job!!! 😍🤢🌿☘️🍀🧚🏿‍♀️🧞‍♂️🧜🏿‍♂️🧛🏻‍♂️');
          startButton.innerText = 'COMPLETE';
          startButton.disabled = true;
          logButton.classList.remove('hidden');
        }
      }
    }
}
function logActivity() {
  pastActivities.push(currentActivity);
  var emptyLog = document.getElementById('empty-log');
  changeColor(emptyLog, 'hidden', cardSection, 'hidden');
  changeColor(currentActivitySection, 'hidden', completedActivitySection, 'hidden');
  cardSection.innerHTML +=
    `<h5 class="card card-cat">${currentActivity.category}</h5>
    <h5 class="card card-time">${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</h5>
    <h5 class="card card-accomplish">${currentActivity.description}</h5>
    <div class="card-color"><div class="card-border"></div></div>`
}

function clearTimerSection() {
  startButton.innerText = 'START';
  startButton.disabled = false;
  changeColor(congratMsg, 'hidden', displayUserTimer, 'hidden');
}

function clearCatButtonSection() {
    buttonText[0].parentNode.classList.remove('study-active');
    buttonText[1].parentNode.classList.remove('meditate-active');
    buttonText[2].parentNode.classList.remove('exercise-active');
}

function clearUserInputsSection() {
  accomplishInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

function createNewActivity() {
  clearCatButtonSection();
  clearUserInputsSection();
  clearTimerSection();
  changeColor(logButton, 'hidden')
  changeColor(completedActivitySection, 'hidden', newActivitySection, 'hidden');


}
