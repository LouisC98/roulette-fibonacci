document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetInput = document.getElementById('totalBudget');
    const startButton = document.getElementById('startButton');
    const gameArea = document.getElementById('gameArea');
    const currentBetDiv = document.getElementById('currentBet');
    const winButton = document.getElementById('winButton');
    const loseButton = document.getElementById('loseButton');
    const currentLossSpan = document.getElementById('currentLoss');

    let totalBudget = 0;
    let fibSequence = [];
    let currentIndex = 0;
    let currentLoss = 0;

    startButton.addEventListener('click', () => {
        totalBudget = parseInt(totalBudgetInput.value) || 0;
        if (totalBudget <= 0) {
            alert("Veuillez entrer un budget total valide.");
            return;
        }
        startGame();
    });

    function generateFibonacciSequence(budget) {
        const sequence = [1, 1];
        let sum = 2; // 1 + 1
        let i = 2;

        while (true) {
            const nextFib = sequence[i - 1] + sequence[i - 2];
            if (sum + nextFib > budget) {
                break;
            }
            sequence.push(nextFib);
            sum += nextFib;
            i++;
        }
        return sequence;
    }

    function startGame() {
        fibSequence = generateFibonacciSequence(totalBudget);
        currentIndex = 0;
        currentLoss = 0;
        
        totalBudgetInput.disabled = true;
        startButton.classList.add('hidden');
        gameArea.classList.remove('hidden');
        
        updateDisplay();
    }

    function updateDisplay() {
        if (currentIndex >= fibSequence.length) {
            currentBetDiv.textContent = "Fin de la séquence";
            winButton.disabled = true;
            loseButton.disabled = true;
            alert("Vous avez atteint la fin de la séquence de Fibonacci pour votre budget. Réinitialisez pour rejouer.");
            resetGame(); // Call resetGame here
            return;
        }
        currentBetDiv.textContent = `${fibSequence[currentIndex]}€`;
        currentLossSpan.textContent = `${currentLoss} €`;
    }

    winButton.addEventListener('click', () => {
        // On a win, we step back two numbers in the sequence.
        currentIndex = Math.max(0, currentIndex - 2);
        currentLoss = 0; // Reset loss on win
        
        updateDisplay(); // Always update display, even if back at start
    });

    loseButton.addEventListener('click', () => {
        currentLoss += fibSequence[currentIndex];

        // Move to the next number in the sequence
        currentIndex++;
        
        updateDisplay();
    });

    function resetGame() {
        totalBudgetInput.disabled = false;
        startButton.classList.remove('hidden');
        gameArea.classList.add('hidden');
        currentBetDiv.textContent = '0';
        currentLossSpan.textContent = '0';
        winButton.disabled = false;
        loseButton.disabled = false;
    }
});