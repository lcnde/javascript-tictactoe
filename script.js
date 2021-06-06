/* 
Rule of thumb:
  If you only need ONE of something (gameBoard, displayController) use a module;
  If you need multiples of something (players) create them with factories;
  Have as little global code as possible;
*/
const player = (name, score) => {

  const mark = () => {
    var spot = document.querySelector(".space");
    spot.addEventListener('click', () => {
      spot.classList.add("spacex");
    });
  };
  return { name, score, mark }
};

const playerone = player('Player 1', 0);
const playertwo = player('Player 2', 0);


var spot = document.querySelectorAll(".space"); //this selects all the elements that have the class of space
spottable = Array.from(spot); //since that selecting multiple elements returns a "sort of array", we convert it to a real array
console.log(spottable)

spottable.forEach(function(element) { //for each element inside "spottable we execute a function, where "element" is the individual elements took one by one
  element.addEventListener('click', () => { //adds an event listener of click on each element and with an arrow function adds some code to them
    magicBox.play(element);
    /*
    element.classList.add("spacex");
    var id = element.getAttribute('id');
    console.log(id);
    */
    });
}); 

const magicBox = {
  play: (element) => {
    if (playerOneTurn == true) {
      element.classList.add("spacex");
    } else {
      element.classList.add("space0")
    };
    
    magicHelper.addRound();
  },
  playerOneTurn: true,
  round: 0,
  playerOneMoves: [],
  playerTwoMoves: [],
};

const magicHelper = {
  addRound: () => {
    magicBox.round += 1;
  },

  signHelper: () => {
    
  }

  switchTurn: () => {
    if (magicBox.playerOneTurn == true) {
      magicBox.playerOneTurn = false;
    } else {
      magicBox.playerOneTurn = true;
    };
  },

  playerOneAddMove: (element) => {
    var id = element.getAttribute('id');
    magicBox.playerOneMoves.push(id);
  }

};

//make a sort of magic box that controls the game. basically that magicbox has to be called after each click, and it knows perfectly which players turn it is, and which sign (x or 0) to put inside the empty space




/*use a module as a game that will keep track of evereything. when you make moves with your players
update the game variables, so you know when a player wins or loses, and when to assign points*/

