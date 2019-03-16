/**************************************/
/* Treehouse Fullstack Techdegree     */
/* Project 4                          */
/* Meng wang                          */
/**************************************/



// store 3 diffrent stage pages' html in variables
const startPage = 
		'<div class="screen screen-start" id="start">' +
			'<header>' +
				'<h1>Tic Tac Toe</h1>' +
				'<label>PLAYER1</label>' +
				'<input type="text" name="player1_name" id="player1_input" maxlength="10">' +
				'<label>PLAYER2</label>' +
				'<input type="text" name="player2_name" id="player2_input" maxlength="10">' +
				'<label><input type="checkbox" name="player3_name" id="player3_input"> PLAYER2 IS COMPUTER CONTROLLED</label>' +
				'<a href="#" class="button">Start game</a>' +
			'</header>' +
		'</div>'; 

const gamePage = 
		'<div class="board" id="board">' +
		 ' <header>' +	
		    '<h1>Tic Tac Toe</h1>' +
		    '<ul>' +
		      '<li class="players player1" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>' +
		      '<li class="players player2" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>' +
		    '</ul>' +
		    '<h2><span id="name1"></span>VS<span id="name2"></span></h2>' +
		  '</header>' +
		  '<ul class="boxes">' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		    '<li class="box"></li>' +
		  '</ul>' +
		'</div>';

let  resultPage = 
		'<div class="screen screen-win" id="finish">' +
		  '<header>' +
		    '<h1>Tic Tac Toe</h1>' +
		    '<p class="message"></p>' +
		    '<a href="#" class="button">New game</a>' +
		  '</header>' +
		'</div>';

let player      = '';  // for indentifing winner player later
let className   = '';  // for storing/indentifing players' checkbox's css style class name 
let count       = 0;   // game over at count=9 no matter anyone wins or not
let computerControl;   // for later check if computer plays or not 


// this class could get the first input's player name or default setting name at start page
class getName1 {

	constructor(player1) {
		this._name = player1;
	}

	get name() {
		return this._name;
	}

	defineName() {
		if(this._name == '') {
			this._name = 'Player 1';
		}
	}

}


// this class could get the second player name or default setting name at start page
// if user typed name info for player2, it will always show that name
class getName2 {

	constructor(player2, checkBox) {
		this._name     = player2;
		this._checkBox = checkBox;
	}

	get name() {
		return this._name;
	}

	// if user didnt type name info, it will show 'Computer' or 'Player 2', depends on who is playing.
	defineName() {
		if(this._name == '') {
			if(this._checkBox) {
				this._name = 'Computer';
			}
			else {
				this._name = 'Player 2';
			}		
		}
	}

}


// utilize this class when click an empty list each time
// it could give the list a checked status(some unique styles), for check game winning purpose
class winner {

	constructor(className, winningStatus, winnerName) {
		this._className       = className;
		this._winningStatus   = winningStatus;
		this._winnerName      = winnerName;
	}

	get className() {
		return this._className;
	}

	get winningStatus() {
		return this._winningStatus;
	}

	get getName() {
		return this._winnerName;
	}

	checkGameOver() {

		let i;
		let array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		for( i=1; i<=9; i++ ) {
			array[i] = $('li.box:nth-child(' + i + ')').hasClass(this._className);
		}

		if( array[1] && array[2] && array[3] ) {
			this._winningStatus = true;
		}
		if( array[4] && array[5] && array[6] ) {
			this._winningStatus = true;
		}
		if( array[7] && array[8] && array[9] ) {
			this._winningStatus = true;
		}
		if( array[1] && array[4] && array[7] ) {
			this._winningStatus = true;
		}
		if( array[2] && array[5] && array[8] ) {
			this._winningStatus = true;
		}
		if( array[3] && array[6] && array[9] ) {
			this._winningStatus = true;
		}
		if( array[1] && array[5] && array[9] ) {
			this._winningStatus = true;
		}
		if( array[3] && array[5] && array[7] ) {
			this._winningStatus = true;
		}

	}

	setName() {

		if( this._winningStatus == true ) {

			if( this._className == 'box-filled-1') {
				this._winnerName = $('#name1').text();
			}
			else {
				this._winnerName = $('#name2').text();
			}

		}
	}


}


// render the start page when open the app
function renderStartPage() {

	$('body').prepend(startPage);
	$('body').prepend(gamePage);
	$('body').prepend(resultPage);
	$('#start').show();
	$('#board').hide();
	$('#finish').hide();
}


// this function will check whether user wanna play against computer 
function checkPlayer2() {

	computerControl = $('#player3_input').prop('checked');
}

// this function could show the game board page when start button is clicked
function renderBoardPage() {

	$('#start').hide();
	$('#board').show();

	// get players names' info from user's input
	let p1Input = $('#player1_input').val();
	let p2Input = $('#player2_input').val();
	let p3Checked = $('#player3_input').prop('checked');

	// Display the player’s name on the board screen during game play
	let input1 = new getName1(p1Input);
	let input2 = new getName2(p2Input, p3Checked);
	input1.defineName();
	input2.defineName();

	let name1 = input1.name;
	let name2 = input2.name;
	$('#name1').text(name1);
	$('#name2').text(name2);

}


// this function will store the players name when he is up to play 
function checkActivePlayer() {
	
    if( $('#player1').hasClass('active') ) {
    	player = 'player1';
    }
    else {
    	player = 'player2';
    }

    return player;
}


// this function will show the active player on the screen after previous player made the play 
function switchActivePlayer() {

	$('#player1').toggleClass('active');
    $('#player2').toggleClass('active');

}


// depend on the active player, give different hover effect for li boxes( diffrent svg background-images)
function hoverEffect() {

    if(player == 'player1') {
		$('.boxes .box').hover(function(){
		    $(this).css("background-image", "url(./img/o.svg)"); 
		    }, function(){
		    $(this).css("background-image", ""); 
		});
    }
    else {
		$('.boxes .box').hover(function(){
		    $(this).css("background-image", "url(./img/x.svg)"); 
		    }, function(){
		    $(this).css("background-image", ""); 
		});
    }

}


// this function will give list box a style after each click
function addStyle() {

	if(player == 'player1') {
		$(event.target).addClass('box-filled-1');
		$(event.target).css("pointer-events", "none");
		className = 'box-filled-1';
	}
	else {
		$(event.target).addClass('box-filled-2');
		$(event.target).css("pointer-events", "none");
		className = 'box-filled-2';
	}
	return className;
}


// this function will check if any player wins after each click
function checkResult(svgName) {

	let winningStatus;
	let message;
	let player1 = new winner(svgName, false, '');

	player1.checkGameOver();
	winningStatus = player1.winningStatus;

	// game over when some one wins
	if(winningStatus) {

		player1.setName();
		let winnerName = player1.getName;
		let typeName   = player1.className;

		message        = 'Winner: ' + winnerName + '!' ;
		renderResult();
		$('#finish p').text(message);

		if(typeName == 'box-filled-1') {
			$('#finish').addClass('screen-win-one');
		}
		else {
			$('#finish').addClass('screen-win-two');
		}

	}
	// game over when count=9(and no one wins), tied game
	else if(count == 9) {

		message = "It's a tie!" ;
		renderResult();
		$('#finish').addClass('screen-win-tie');
		$('#finish p').text(message);
	}
	// game not over, continue to play
	else {
		console.log('continue playing the game');
	}

}


//generate a randomnumber between 1-9
function randomNumber() {

	let number = Math.floor( Math.random() * 9 + 1 );
	return number;
}


// use this function to make move for computer (random pick & check  remaining one list box) 
function computerAction() {

	let chooseNumber = randomNumber();
	let hasClass1	 = $( 'li.box:nth-child(' + chooseNumber + ')' ).hasClass('box-filled-1');
	let hasClass2	 = $( 'li.box:nth-child(' + chooseNumber + ')' ).hasClass('box-filled-2');

	// find remanining unchecked li:nth-child 
	while ( hasClass1 || hasClass2 ) {
		
		chooseNumber = randomNumber();
		hasClass1	 = $( 'li.box:nth-child(' + chooseNumber + ')' ).hasClass('box-filled-1');
		hasClass2	 = $( 'li.box:nth-child(' + chooseNumber + ')' ).hasClass('box-filled-2');
	}

	$( 'li.box:nth-child(' + chooseNumber + ')' ).addClass('box-filled-2');
	$( 'li.box:nth-child(' + chooseNumber + ')' ).css("pointer-events", "none");
	className = 'box-filled-2';

}


// hide the play board and show the final result page
function renderResult() {

	$('#board').hide();
	$('#finish').show();
}




// load start page then play the game

renderStartPage();

// hide the start page then add board screen after clicking the start button on start page  
$(document).on('click', 'a.button', function() {

	checkPlayer2();
	renderBoardPage();
	$('#player1').addClass('active');		
	checkActivePlayer();
	hoverEffect();
});


// check list box, change active player after each click.
$(document).on('click', '#board li.box', function() {

	// in this case, two human player play agianst each other
	if( !computerControl ) {

		count++;	
		addStyle();
		checkResult(className); // if some one wins, end game and render result page, else continue playing
		switchActivePlayer();
		checkActivePlayer();
    	hoverEffect();

	}

	// player1 play agianst computer
	else {

		count += 1;
		addStyle();
		checkResult(className); // if some one wins, end game and render result page, else continue playing

		if(count != 9) {
			computerAction();
			count += 1;
			checkResult(className); // if computer wins, end game and render result page, else continue playing
		}

	}

});


// start a another game when click the 'new game' at result page
$(document).on('click', '#finish a.button', function() {
	
	count = 0;
	$('#board').remove();
	$('#finish').remove();
	$('body').prepend(gamePage);
	$('body').prepend(resultPage);
	$('#board').hide();
	$('#finish').hide();

	renderBoardPage();
	$('#player1').addClass('active');		
	checkActivePlayer();
	hoverEffect();
	
});












