const gameContainer = document.getElementById("game");
var score= 0;



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
  }
}

var click = 0;
var noClick = true;
var attempt=0;
var previousEvent;
var cardsFlipped=0;

// TODO: Implement this function!

function handleCardClick(event) {
  if(noClick === false){
    return;
  }
  //set click to 1.
  click++;
  //set the current card color
  var currentColor = String(event.target.classList);
  //flip first card and store it
   if(click <2){
  //give card background color attribute and store the first cards color
    event.target.setAttribute("style", "background-color:" + currentColor);
    //console.log("your first click was " + currentColor);
    holdEvent = event.target;
    previousColor = currentColor;
  }
  //flip second card and set color
  if(click ===2 ){
       click = 0;
       event.target.setAttribute("style", "background-color:" + currentColor);
       
       //console.log("Your second click was " + currentColor);
      
      if(holdEvent === event.target){
        alert("you clicked on the same card, your turn has not been taken, please continue playing...");
        noClick = false;
        // document.getElementsByTagName('div').disabled = true; 
          setTimeout(function(){
          event.target.removeAttribute("style");
          holdEvent.removeAttribute("style");
        }, 1000);
        setTimeout(function(){
          noClick = true;
        },1100);
      }
       // if the 2 cards dont match 
      else if(currentColor != previousColor){
        console.log("you missed, try again");
        noClick = false;
        attempt++
        // document.getElementsByTagName('div').disabled = true; 
          setTimeout(function(){
          event.target.removeAttribute("style");
          holdEvent.removeAttribute("style");
          
          
        }, 1000);
        setTimeout(function(){
          noClick = true;
        },1500);
      }
      else if(currentColor === previousColor){
        console.log("you got a match! Keep it up!");
        cardsFlipped += 2;
        
      }

    }
    if (cardsFlipped === COLORS.length) alert("game over! You got " + attempt + " cards wrong!");
}


// when the DOM loads
createDivsForColors(shuffledColors);


