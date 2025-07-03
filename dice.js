// Game variables
let scores, currentScore, activePlayer, playing;

// Initialize game
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    document.querySelector('.play1-btn').textContent = '0';
    document.querySelector('.play2-btn').textContent = '0';
    document.querySelector('.play1-scr').textContent = '0';
    document.querySelector('.play2-scr').textContent = '0';

    document.querySelector('.play1').style.color = 'black';
    document.querySelector('.play2').style.color = 'black';
    document.querySelector('.dice').style.display = 'none';

    // Reset backgrounds
    document.querySelector('.main1').style.backgroundColor = 'rgb(246, 199, 221)';
    document.querySelector('.main2').style.backgroundColor = 'rgb(192, 115, 147)';

    // Set active highlight
    document.querySelector('.main1').classList.add('active-player');
    document.querySelector('.main2').classList.remove('active-player');
}



// Switch active player
function switchPlayer() {
    currentScore = 0;
    document.querySelector(`.play${activePlayer + 1}-scr`).textContent = currentScore;

    // Remove active class from current player
    document.querySelector(`.main${activePlayer + 1}`).classList.remove('active-player');

    // Switch player
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Add active class to new player
    document.querySelector(`.main${activePlayer + 1}`).classList.add('active-player');
}


// Roll dice
document.querySelector('.roll').addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        const diceEl = document.querySelector('.dice');
        
        // Update image
        diceEl.style.display = 'block';
        diceEl.src = `./dice-${dice}.jpg`;

        // Trigger animation
        diceEl.classList.remove('rolling'); // reset
        void diceEl.offsetWidth; // force reflow to restart animation
        diceEl.classList.add('rolling');

        // Game logic
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`.play${activePlayer + 1}-scr`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Hold score
document.querySelector('.hold').addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`.play${activePlayer + 1}-btn`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;

            // Change background to green
            const winnerBox = document.querySelector(`.main${activePlayer + 1}`);
            winnerBox.style.backgroundColor = 'green';

            // Remove active highlight from both
            document.querySelector('.main1').classList.remove('active-player');
            document.querySelector('.main2').classList.remove('active-player');

            // Optional: make player name white
            document.querySelector(`.play${activePlayer + 1}`).style.color = 'white';

            alert(`Player ${activePlayer + 1} wins! 🎉`);

            // Hide dice
            document.querySelector('.dice').style.display = 'none';
        } else {
            switchPlayer();
        }
    }
});


// New game
document.querySelector('.new-game').addEventListener('click', init);

// Start game
init();
