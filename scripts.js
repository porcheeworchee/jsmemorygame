const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;



function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	var audio = new Audio("cardslide1.ogg");
	audio.play();

	//- sounds

	this.classList.add('flip');	

	if (!hasFlippedCard) {

		//first clicked
		hasFlippedCard = true;
		firstCard = this;

		return;
	}
		// second clicked
		secondCard = this;

		checkForMatch();
	}


	function checkForMatch() {
		let isMatch = firstCard.dataset.framework ===
		secondCard.dataset.framework;

		isMatch ? disableCards() : unflipCards();

		
	}

	function disableCards() {
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);

		var audio = new Audio("correctanswer.mp3");
	audio.play();


	//- sounds

		resetBoard();
	}

	function unflipCards(){
		lockBoard = true;

		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			resetBoard();
			}, 1200);

	}

function resetBoard() {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);	
		card.style.order = randomPos;
	});	

})();


cards.forEach(card => card.addEventListener('click', flipCard))
	;