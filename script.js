const info = document.getElementById("info");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guess");
const numberSubmitted = document.getElementById("numberSubmitted");
const hint = document.getElementById("hint");
const results = document.getElementById("results");
const attemptsDisplay = document.getElementById("attempts");

const maxAttempts = 10;
let guessedNumbers = [];

// Generates a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

guessForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const guessValue = parseInt(guessInput.value, 10);
    numberSubmitted.textContent = `Your guess: ${guessValue}`;

    if (isNaN(guessValue)) {
        results.textContent = "Please enter a valid number!";
        return;
    }

    guessedNumbers.push(guessValue);

    hint.textContent = (randomNumber % 2 === 0) ? "Hint: The number is even" : "Hint: The number is odd";

    if (guessValue === randomNumber) {
        results.textContent = `🎉 Congratulations! You guessed the number ${randomNumber} in ${guessedNumbers.length} attempts!`;

        if (guessedNumbers.length <= 4) {
            results.textContent += " 🏆 You're a great guesser!";
        }

        endGame(true);
        return;
    } else if (guessValue < randomNumber) {
        results.textContent = "📉 Too low! Try a higher number.";
    } else {
        results.textContent = "📈 Too high! Try a lower number.";
    }

    // Update attempts left
    const attemptsLeft = maxAttempts - guessedNumbers.length;
    attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;

    // End game if max attempts reached
    if (guessedNumbers.length === maxAttempts) {
        results.textContent = `❌ Too many guesses, you lose! The correct number was ${randomNumber}.`;
        endGame(false);
    }

    guessInput.value = '';
    console.log(randomNumber)
});

function endGame(isWin) {
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;

    // Displays game summary
    info.innerHTML = `
        <h3>Game Summary:</h3>
        <p>Correct Number: ${randomNumber}</p>
        <p>Total Attempts: ${guessedNumbers.length}</p>
        <p>Your Guesses: ${guessedNumbers.join(", ")}</p>
    `;

    // Add "New Game" button
    const newGameButton = document.createElement('button');
    newGameButton.textContent = "🔄 Start New Game";
    newGameButton.addEventListener('click', () => location.reload());

    info.appendChild(newGameButton);
}
