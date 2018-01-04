
var clock = document.getElementById('clock');
var work = document.getElementById("work");
var title = document.getElementById('title');
var breakMinutes = document.getElementById('breakTime');
var seconds = 25;
var bSeconds = 5;
var counting = false;
var sessionCountdownId;
var breakCountdownId;
const alarmSound = new Audio('http://soundbible.com/mp3/Turkey Gobble-SoundBible.com-123256561.mp3');
/////////////////////////////////////
function timer(seconds) {
  seconds = seconds * 60;
  clearInterval(sessionCountdownId);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  //displayEndTime(then);
  sessionCountdownId = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft === 0) {
      alarmSound.play();
      clearInterval(sessionCountdownId);
      breakTimer(bSeconds);
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  document.title = display;
  session.textContent = display;
}

function displayBreakLeft(bSeconds) {
  const breakMinutes = Math.floor(bSeconds / 60);
  const breakRemainderSeconds = bSeconds % 60;
  const displayBreak = `${breakMinutes}:${breakRemainderSeconds < 10 ? "0" : ""}${breakRemainderSeconds}`;
  document.title = displayBreak;
  session.textContent = displayBreak;
}
/////////////////////////////////////
function breakTimer(bSeconds) {
  //debugger;
  bSeconds = bSeconds *60;
  clearInterval(breakCountdownId);
  const now = Date.now();
  const then = now + bSeconds * 1000;
  //debugger;
  displayBreakLeft(bSeconds);
  title.textContent = "BREAK";
  //displayEndTime(then);
  breakCountdownId = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(breakCountdownId);
      return;
    }
    // display it
    displayBreakLeft(secondsLeft);
  }, 1000);
}

clock.addEventListener("click", startTimer);

function startTimer() {
  
  title.textContent = "SESSION";
  clearInterval(sessionCountdownId);
  clearInterval(breakCountdownId);
  counting = true;
  var work = document.getElementById("work");
  var seconds = parseInt(work.innerHTML);
  //clock.removeEventListener('click', startTimer);
  handlers.session.innerHTML = seconds;
  timer(seconds);
}
var resetButton = document.getElementById("resetBut");
resetButton.addEventListener("click", resetTimer);

function resetTimer() {
  clock.addEventListener('click', startTimer);
  counting = false;
  clearInterval(sessionCountdownId);
  clearInterval(breakCountdownId);
    console.log('reset pressed');
}

var handlers = {
  breakTimeContext: document.getElementById("breakTime"),
  session: document.getElementById("session"),
  work: document.getElementById("work"),

  breakTimeDecrement: function() {
    bSeconds.disabled = false;
    console.info('Break time decrement pressed!')
    handlers.breakTimeContext.innerHTML = Math.max(1, --bSeconds);
    if (bSeconds === 1) {
      breakMinus.disabled = true;
    }
  },
  breakTimeIncrement: function() {
    console.info('Break time increment pressed!')
    breakMinus.disabled = false;
    handlers.breakTimeContext.innerHTML = Math.max(1, ++bSeconds);
  },
  sessionTimeDecrement: function() {
    resetTimer();
    title.innerHTML = 'SESSION';
    handlers.work.innerHTML = Math.max(1, --seconds);
    handlers.session.innerHTML = Math.max(1, seconds);
  },
  sessionTimeIncrement: function() {
    resetTimer();
    title.innerHTML = "SESSION";
    handlers.work.innerHTML = Math.max(1, ++seconds);
    handlers.session.innerHTML = Math.max(1, seconds);
  }
};

// var w = 100;
// var h = 100;
// var foo = setInterval(function () {
//     if(h > 100) clearInterval(foo)
//     w = w + 5;
//     h = h + 5;
//     //document.getElementById('clock').style.width = w + '%';
//     document.getElementById('clock').style.height = h + '%';
// }, 1000);

// var per = 0;
// setInterval(function(){ 
//     per++;
//     if(per <= 100){
//       var clockColor = document.getElementById('clock'), c = clockColor.style;
//       c.background = 'linear-gradient(to top)';
    
//         $('#load-bar').css({background: 
//           "linear-gradient(to right, 
//             #000000 "+per+"%,#feffff "+per+"%,#feffff 100%)"});
       
//     }

// }, 1000);

// var m = document.getElementById("myelement"), c = m.style;
// c.color = "#c00";
// c.backgroundColor = "#eee";
// c.width = "200px";
// c.height = "100px";
// c.borderColor = "#f00";

/* function timer(seconds) {
  clearInterval(sessionCountdownId);
  var sessionCountdownId = setInterval(sessionTimer, 1000);
  console.log(seconds);
  function sessionTimer() {
    if (counting === false) {
      clearInterval(sessionCountdownId);
      return;
    }
    seconds -= 1;
    session.textContent = seconds;
    console.log(seconds);
    if(seconds < 0) {
      title.textContent = "BREAK";
      clearInterval(sessionCountdownId);
      breakTime(bSeconds);
      session.textContent = bSeconds;
    }
  }
} */


/* function breakTime(bSeconds) {
  bSeconds = bSeconds * 60;
  bSeconds = parseInt(breakMinutes.innerHTML);
  breakCountdownId = setInterval(breakTimer, 1000);
  function breakTimer() {
    //counting = true;
    bSeconds -= 1;
    session.textContent = bSeconds;
    if(bSeconds === 0) {
      clearInterval(breakCountdownId);
      clock.addEventListener('click', startTimer);
    }
  }
} */