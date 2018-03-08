//Zmienne
newGameBtn = document.getElementById('js-newGameButton');

newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement');

pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors');

playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints');

playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult');

var gameState = 'notStarted',  //started // ended // notStarted
    player = {
        name: '',
        score: 0,
        one_more_time:''
    },
    computer = {
        score: 0
    };

//Wartości w różnych stanach gry - początek , koniec, nie rozpoczęta 

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

// Rozpoczęcie Nowej Gry

newGameBtn.addEventListener('click', newGame);	

function newGame() {
  player.name = prompt('Chcesz zagrać?', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}

// Rozgrywka 

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// Wybór Komputera

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// Wybór Gracza

function playerPick(playerPick) {
     var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// Funkcja odpowiedzialna za sprawdzanie wyniku 

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
    } 	else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
        	setGamePoints()
        	endOfGame()
    	}

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        	setGamePoints()
        	endOfGame()
    } 	else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        	setGamePoints()
        	endOfGame()
    	}

}

// Funkcja odpowiedzialna za umieszczenie wyniku na stronie

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// Koniec Gry

function endOfGame() {
	if (player.score >= 10) {
		alert('Gratulacje! ' + player.name + ' Zdobyłeś 10 punktów' );
		newGame()
	}
		else if (computer.score >= 10) {
		alert('Gratulacje Computer! Zdobyłeś 10 punktów');
		newGame()
		}
}





