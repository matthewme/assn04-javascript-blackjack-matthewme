
var playerOneMoney = 500
var totalBet = 0


var dealerScore  = 0
var playerScore = 0

var deck = []

function createDeck(deck)
{
	var deckOfCards = ['2C','2D','2H','2S','3C','3D','3H','3S','4C','4D','4H',
	'4S','5C','5D','5H','5S','6C','6D','6H','6S','7C','7D','7H','7S','8C',
	'8D','8H','8S','9C','9D','9H','9S','JC','JD','JH','JS','QC','QD','QH',
	'QS','KC','KD','KH','KS','TC','TD','TH','TS','AC','AD','AH','AS']

	return deckOfCards
}

var endGame = "false"
var startGame = "false"

$("#pOneMoney").text(playerOneMoney)

function checkStandScore()
{
	if(playerScore > dealerScore && playerScore <= 21)
	{
		alert("You Win!")
		endGame = "true"
		playerOneMoney += totalBet
		$("#pOneMoney").text(playerOneMoney)
	}
	else if(dealerScore > playerScore && dealerScore <= 21)
	{
		alert("You Lose!")
		endGame = "true"
		playerOneMoney -= totalBet
		$("#pOneMoney").text(playerOneMoney)

	}
	else if(dealerScore == playerScore) 
	{
		alert("It's a tie!")
		endGame = "true"
	}
}

function checkScore(playerScore)
{
	if(playerScore > 21)
	{
		alert("You Lose!")
		endGame = "true"
		playerOneMoney -= totalBet
		$("#pOneMoney").text(playerOneMoney)
	}
	else if(playerScore == 21)
	{
		stand()
	}
}

function refresh()
{
	//Refresh Webpage
	location.reload();
}

function shuffle(deck) {
    let counter = deck.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = deck[counter];
        deck[counter] = deck[index];
        deck[index] = temp;
    }

    return deck;
}

function dealerAce()
{
	//Random number between 0 and 1
	var rand = Math.floor(Math.random() * 2);

	if(rand == 0)
	{
		dealerScore += 1;
	} 
	else
	{
		dealerScore += 11;
	}

	$("#cardSumDealer").text(dealerScore)//update score view
}

function ace()
{
	//get the modal
	var modal = document.getElementById('myModal');
	modal.style.display = "block";

	// Get the <input> element that closes the modal
	var input = document.getElementsByClassName("ace1btn")[0];

	// When the user clicks on 1, close the modal
	input.onclick = function() {
	    modal.style.display = "none";
	    playerScore += 1
	    checkScore(playerScore)	
	    $("#cardSumPlayer").text(playerScore)//update score view
	}

	// Get the <input> element that closes the modal
	var input = document.getElementsByClassName("ace11btn")[0];

	// When the user clicks on 11, close the modal
	input.onclick = function() {
	    modal.style.display = "none";
	    playerScore += 11
	    checkScore(playerScore)	
	    $("#cardSumPlayer").text(playerScore)//update score view
	}

}

function getScore(card)
{
	var score = 0;
	
	if(card.startsWith("2"))
		score = 2
	else if(card.startsWith("3"))
		score = 3
	else if(card.startsWith("4"))
		score = 4
	else if(card.startsWith("5"))
		score = 5
	else if(card.startsWith("6"))
		score = 6
	else if(card.startsWith("7"))
		score = 7
	else if(card.startsWith("8"))
		score = 8
	else if(card.startsWith("9"))
		score = 9
	else if(card.startsWith("T"))
		score = 10
	else if(card.startsWith("J"))
		score = 10
	else if(card.startsWith("Q"))
		score = 10
	else if(card.startsWith("K"))
		score = 10

	return score;
}

function addCardBtn()
{
	hit()
}

function hit()
{
	if(endGame == "true")
	{
		alert("Click Deal To Start Another Game")
	}
	else if(startGame == "false")
	{
		alert("You Must Deal First")
	}
	else
	{
		card = $("#playerOneCardOne").clone();
		//Get new card from array and remove Card from deck
		var newCard = deck.pop()
		card.attr('src', 'cards/' + newCard + '.png')
		//Display the card
		$("#card").append(card)

		//Calculate score. If card is an ace let player choose score
		//else the score is automactic
		if(newCard.startsWith("A"))
		{
			ace()
		}
		else
		{
			playerScore += getScore(newCard)
		}
		
		checkScore(playerScore)	
		
		//Show Score
		$("#cardSumPlayer").text(playerScore)
	}
	//$("#cl").text(deck)
}		

function dealBtn()
{
	deal()	
}

function deal()
{
	if(playerOneMoney == 0)
	{
		alert("You have no money!")
	}
	else
	{
		//Reset game except for money
		deck = createDeck(deck)
		
		$("#card").empty()

		playerScore = 0
		dealerScore = 0
		totalBet = 0 
		$("#pOneBet").text(totalBet)
		$("#dealerCardTwo").attr('src','cards/cardback.png')

		startGame = "true"
		endGame = "false"

		//Shuffle
		shuffle(deck)

		//Give Dealer a card and remove Card from deck
		var newCard1 = deck.pop()
		$("#dealerCardOne").attr('src', 'cards/' + newCard1 + '.png')

		//Remove two cards and hand them to player
		var newCard2 = deck.pop()
		$("#playerOneCardOne").attr('src', 'cards/' + newCard2 + '.png')
		var newCard3 = deck.pop()
		$("#playerOneCardTwo").attr('src', 'cards/' + newCard3 + '.png')
		
		//Calulate score. If dealer gets Ace score is automatic.
		//If player gets Ace they choose
		if(newCard1.startsWith("A"))
		{
			dealerAce()	
		}
		else
		{
			dealerScore += getScore(newCard1)
		}

		//Autmatic Win if player starts with two aces
		if(newCard2.startsWith("A") && newCard3.startsWith("A"))
		{
			playerScore += 21;
			stand()	
			
		}
		else if(newCard2.startsWith("A"))
		{
			ace()
			playerScore += getScore(newCard3)
		}
		else if(newCard3.startsWith("A"))
		{
			ace()
			playerScore += getScore(newCard2)
		}
		else
		{
			playerScore += getScore(newCard2)
			playerScore += getScore(newCard3)
		}
		
		//Show card sums
		$("#cardSumDealer").text(dealerScore)
		$("#cardSumPlayer").text(playerScore)
		
		//$("#cl").text(deck)
	}
}


function standBtn()
{
	stand()
}

function stand()
{
	if(endGame == "true")
	{
		alert("Click Deal To Start Another Game")
	}
	else if(startGame == "false")
	{
		alert("You Must Deal First")
	}	
	else
	{
		//Give Dealer a card and remove Card from deck
		var newCard1 = deck.pop()

		$("#dealerCardTwo").attr('src', 'cards/' + newCard1 + '.png')

		if(newCard1.startsWith("A"))
		{
			dealerAce()	
		}
		else
		{
			dealerScore += getScore(newCard1)
		}
		$("#cardSumDealer").text(dealerScore)//update score view

		checkStandScore()
	}
	///$("#cl").text(deck.length)
}

function betBtn()
{
	bet()
}

function bet()
{

	if(startGame == "false")
	{
		alert("You Must Deal First")
	}	
	else
	{
		var check = $("#dealBox").val();
	
		if(check == '')
		{
			alert("Input a Number")
		}
		else
		{
			//Get Value from the textbox
			var x = $("#dealBox").val();

			totalBet += parseInt(x)

			$("#pOneBet").text(totalBet)
			$("#dealBox").val('')
		}
		
	}
}






