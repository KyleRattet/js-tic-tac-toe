//Constructor
var Game = function () {
  this.turnCounter = 1;
  this.board = new Board ();
  this.player1 = new Player ('X', 'oneScore');
  this.player2 = new Player ('O', 'twoScore');
};

//Game Methods
Game.prototype.nextPlayer = function () {
  //update the turnCounter based on next player
  //check winner (fire method on board class)
  //update dom indicating who is playing

  //assinging current player
  if (this.turnCounter === 1) {
    this.turnCounter = 2;
    this.currentPlayer = this.player2;
  } else {
    this.turnCounter = 1;
    this.currentPlayer = this.player1;
  }
};

Game.prototype.updateScore = function () {
  //updates DOM indicating which player won
  //update counter scoreboard (probably on player constructor)
};

Game.prototype.init = function () {
  //revisit after declaring other classes/methods
  this.currentPlayer = this.player1;

};

//Player Constructor
var Player = function (team, cellID) {
  //specifying 'X' or 'O'
  this.team = team;
  //span id onescore or twoscore
  this.cellID = cellID;
  this.playerScore = 0;
};

//Board Constructor
var Board = function () {
  //blank board, move array that will be altered with each move, null will become either 'X' or "O"
  this.moveArr = [
      null, null, null,
      null, null, null,
      null, null, null
  ];
  this.$cells = $('.box');
  //add eventhandler for resetting the board
};

//Board Methods
Board.prototype.makeMove = function(cellNumberID, team) {
  //starting point
  //when box is clicked, grab the boxes id, update box contents with X or O and update the move array
  //make sure box isn't occupied, conditional checking for null or 'X'or 'O'

  this.moveArr[cellNumberID] = team;
  console.log("this moveArr", this.moveArr);
  console.log(cellNumberID);

};

Board.prototype.winCondition =
  ///create an array of win conditions
  //will end up being an array of eight arrays i.e. [[1,2,3], [4,5,6], etc ...]
  [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];


Board.prototype.checkWinner = function(team) {
  //comparing moveArr of each player to the win condition array, only on the current players move
  // var result = false;
  for (var i = 0; i < this.winCondition.length; i++) {

  if  ((this.moveArr[this.winCondition[i][0]] === team) &&
      (this.moveArr[this.winCondition[i][1]] === team) &&
      (this.moveArr[this.winCondition[i][2]] === team))  {
      console.log("winner");

    } else {
      console.log("no");
    }

  }

};

Board.prototype.resetBoard = function() {
  //empty out the board array, resetting moveArr to all null
  //reset turn counter to 1
  //clear out the DOM
  //could use nullArray method, or abstract it out
};

Board.prototype.nullArray = function() {

};

$(document).on('ready', function() {
  // body...
 var game = new Game ();
 game.init();

$('.box').on('click', function () {
  //fire game.nextPlayer
  console.log($(this).html());
  if ($(this).html() === '&nbsp;') {
    $(this).html(game.currentPlayer.team);
    var cellNumberID = ($(this).attr('id'));

    game.board.makeMove(cellNumberID, game.currentPlayer.team);

    game.board.checkWinner(game.currentPlayer.team);
    game.nextPlayer();
  } else {
    alert ("occupied");
  }



  });


});
// event handler for adding an X or O to box
  // on click
  // grab id
  // fire the makeMove method, passing in the id
    // update the moveArr
    // ensure that you don't update a box already occupired by an X or O


