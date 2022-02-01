const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text");
const startOver = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// const status=document.querySelector("#notify");
const wordsPerMinuteLabel = document.querySelector(".wpm");
const accuracyLabel = document.querySelector(".accuracy");

const topOne = document.querySelector(".One");
const topTwo = document.querySelector(".Two");
const topThree = document.querySelector(".Three");

let timerInterval;
        

//Here the besttimes are calculated based on the speed of typing, to do that calculating speed(number of words/minute) and then displaying time
//according to the ascending order of speeds
//Used map to store (time, speed)

var errors = 0;
let startTime;
let elapsedTime = 0;
var timer = [0,0,0,0];
var wpmInterval;
var timerRunning = false;
var timeElapsed = 0;
var randomParagraph = 0;
var wpm;
const topScores=[0,0,0,0];
let currScore=0;
let currentTime;
const map1 = new Map();
let res;
let time;
let temp=0;


//listeners for button and textinput
startOver.addEventListener("click", reset);
testArea.addEventListener("input", start);




//function to start timer
function start() {
  // startTime = Date.now() - elapsedTime;
  spellCheck();
  console.log();
  let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 1 && !timerRunning) {
        timerRunning = true;
      timerInterval = setInterval(runTimer, 10); 
   }
}


function reset() {
  clearInterval(timerInterval);
    timerInterval = null;
    wpmInterval = null;
    timer = [0,0,0,0];
    timerRunning = false;
   testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wordsPerMinuteLabel.innerHTML = 0 + "";;
    randomParagraphGenerator();
   // testArea.disabled = false;
   // wpm = 0 + " WPM";
    // timeElapsed = 0;
    // errors = 0;
   
}
//function to append 0 if less than 10
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Functipn that runs a standard minute/second/hundredths timer:
function runTimer() {
     currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

  //   timeElapsed = timer[0]*60 + timer[1];
    console.log("timelapased test"+timer[1]);
   console.log("timelapased test"+timer[2]);
}

//this function compares the inputted text and the originText and notifies user
function spellCheck() {
    let textEntered = testArea.value;
    //console.log("entered"+originText.innerText.substring(1,3));
    let originTextMatch = originText.innerText.substring(0,textEntered.length);
    if (textEntered == originText.innerText) {
        
         let totalStr=testArea.value;
         let wordCount=wordCounter(totalStr);
         let currSpeed=speedCalci(wordCount);
         wordsPerMinuteLabel.innerHTML =Math.abs(currSpeed);
         clearInterval(timerInterval);
         clearInterval(wpmInterval);
         testWrapper.style.borderColor = "#429890"; //Green
         bestScores(currSpeed,topScores);
        
      // console.log("error count"+errors);
    } 
    else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"; //Blue
        } else {
              // errors++;
              testWrapper.style.borderColor = "red"; 
            
        }
    }
}


//this function generates random text as input for test using Math.random() and switch case
function randomParagraphGenerator() {
    let par1 = "Start where you are. Use what you have. Do what you can.";
    let par2 = "One important key to success is self-confidence. An important key to self-confidence is preparation.";
    let par3 = "A wise person decides slowly but abides by these decisions.";
    let par4 = "You learn about equality in history and civics, but you find out life is not really like that.";
    let par5 = "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.";
    let par6 = "Life is what happens while you are busy making other plans.";
    let par7 = "Every man dies. Not every man really lives.";
    let par8 = "One good thing about music, when it hits you, you feel no pain.";
  
    switch (Math.floor(Math.random() * 8)) {
      case 0:
        document.querySelector("#origin-text p").innerHTML = par1;
        break;
      case 1:
        document.querySelector("#origin-text p").innerHTML = par2;
        break;
      case 2:
        document.querySelector("#origin-text p").innerHTML = par3;
        break;
      case 3:
        document.querySelector("#origin-text p").innerHTML = par4;
        break;
      case 4:
        document.querySelector("#origin-text p").innerHTML = par5;
         break;
      case 5:
        document.querySelector("#origin-text p").innerHTML = par6;
        break;
      case 6:
        document.querySelector("#origin-text p").innerHTML = par7;
        break;
      case 7:
        document.querySelector("#origin-text p").innerHTML = par8;
        break;
     
    }

}


//function to compare and sort the top 3 scores
function bestScores(currSpeed,arr)
{
  arr[3]=currSpeed;
  arr.sort(function(a, b){return b-a});
    console.log("array is"+arr);
    if(currSpeed!=arr[3])
      {
        map1.set(currentTime, currSpeed);
        map1[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
            }
                for (let [key, value] of map1) {     
            console.log("map"+key + ' ' + value);
        }
       
      } 
 
        if(temp==0)
          {
             topOne.innerHTML="Time : "+getByValue(map1,Math.abs(arr[0]))+"   Words/minute : "+arr[0];
             temp++;
          }
        else if (temp==1)
          {
            topOne.innerHTML="Time : "+getByValue(map1,Math.abs(arr[0]))+"   Words/minute : "+arr[0];
            topTwo.innerHTML="Time : "+getByValue(map1,Math.abs(arr[1]))+"   Words/minute : "+arr[1];
            temp++;
          }
        else
          {
            topOne.innerHTML="Time : "+getByValue(map1,Math.abs(arr[0]))+"   Words/minute : "+arr[0];
            topTwo.innerHTML="Time : "+getByValue(map1,Math.abs(arr[1]))+"   Words/minute : "+arr[1];
            topThree.innerHTML="Time : "+getByValue(map1,Math.abs(arr[2]))+"   Words/minute : "+arr[2];
          }
        console.log("arramlmly is"+topOne);
  
}

//calculating the speed
function speedCalci(count){
  let tempMin=leadingZero(timer[0]);
  let tempSec=leadingZero(timer[1]);
  let tempMilli=leadingZero(timer[2]);
  console.log("tempSec"+tempSec);
  if(tempMin>0)
  {
     res=((count/tempMin)*360);
     time=tempMin;
    return res;
  }
  else if(tempSec<=0&&tempMilli>0)
    {
       res= (count/tempMilli);
      time=tempMilli;
      return res;
    }
  else
    {
      res= ((count/tempSec)*60);
      time=tempSec;
      return res;
    }
}
//calcualting the number of words in the text
function wordCounter(str)
{
  let length=str.split(" ").length;
  return length;
}

//function to get keys from a map using value; map(key<time>,value<speed>)
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}






