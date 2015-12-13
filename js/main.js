//Constructor
var Game = function () {
  this.turnCounter = 1;
  this.board = new Board ();
  this.player1 = new Player ('X', 'oneScore');
  this.player2 = new Player ('O', 'twoScore');
};

//Game Methods
Game.prototype.nextPlayer = function () {
  //assinging current player
  if (this.turnCounter === 1) {
    this.turnCounter = 2;
    this.currentPlayer = this.player2;
    $('#your-turn').html("Player O");
  } else {
    this.turnCounter = 1;
    this.currentPlayer = this.player1;
    $('#your-turn').html("Player X");
  }
};


Game.prototype.init = function () {
  this.currentPlayer = this.player1;
};

//Player Constructor
var Player = function (team, cellID) {
  //specifying 'X' or 'O'
  this.team = team;
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
};

//Board Methods
Board.prototype.makeMove = function(cellNumberID, team) {
  this.moveArr[cellNumberID] = team;
  console.log("this moveArr", this.moveArr);
  console.log(cellNumberID);

};

Board.prototype.winCondition =
  ///create an array of win conditions

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

  var hasWinner = false;
  for (var i = 0; i < this.winCondition.length; i++) {

    if (
      (this.moveArr[this.winCondition[i][0]] === team) &&
      (this.moveArr[this.winCondition[i][1]] === team) &&
      (this.moveArr[this.winCondition[i][2]] === team)
      )  {
        hasWinner = true;
      }

  }

 if (hasWinner) {

      alert ("Team " +team+ " wins!");
      if (team === 'X') {
         var oneScoreTotal = parseInt($('#oneScore').html());
         $('#oneScore').html(oneScoreTotal + 1);
      }
      else if (team === 'O') {
         var twoScoreTotal = parseInt($('#twoScore').html());
         $('#twoScore').html(twoScoreTotal + 1);
      }

      this.resetBoard();
    }

  //tie scenario
  if(this.moveArr.indexOf(null) === -1) {
  alert('tie');
  this.resetBoard();
  }

};

Board.prototype.resetBoard = function() {

  this.moveArr = [
      null, null, null,
      null, null, null,
      null, null, null
  ];
  this.turnCounter = 1;
  $('.box').html('&nbsp;');
};

Board.prototype.nullArray = function() {

};

$(document).on('ready', function() {

 var game = new Game ();
 game.init();

$('.box').on('click', function () {
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

//reset button
$('.reset').on('click', function() {
  $('#oneScore').html(0);
  $('#twoScore').html(0);
  game.board.resetBoard();



});


});



