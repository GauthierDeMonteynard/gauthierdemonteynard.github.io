const game = {
    score: 0,
    currentAnswer: 0,
    userTyped: "",

    elements: {
        intro: document.getElementById('intro-screen'),
        board: document.getElementById('game-board'),
        question: document.getElementById('question'),
        display: document.getElementById('display-answer'),
        score: document.getElementById('score-val'),
        container: document.getElementById('game-container')
    },

    // Affiche le plateau de jeu
    start() {
        this.score = 0;
        this.elements.score.innerText = this.score;
        this.elements.intro.classList.add('hidden');
        this.elements.board.classList.remove('hidden');
        this.generateQuestion();
    },

    // Retourne au menu
    showMenu() {
        this.elements.intro.classList.remove('hidden');
        this.elements.board.classList.add('hidden');
    },

    generateQuestion() {
        this.userTyped = "";
        this.updateDisplay();

        const operators = ['+', '-', '×'];
        const op = operators[Math.floor(Math.random() * operators.length)];

        let n1 = Math.floor(Math.random() * 11);
        let n2 = Math.floor(Math.random() * 11);

        if (op === '+') {
            this.currentAnswer = n1 + n2;
            this.elements.question.innerText = `${n1} + ${n2}`;
        } else if (op === '-') {
            const max = Math.max(n1, n2);
            const min = Math.min(n1, n2);
            this.currentAnswer = max - min;
            this.elements.question.innerText = `${max} - ${min}`;
        } else if (op === '×') {
            this.currentAnswer = n1 * n2;
            this.elements.question.innerText = `${n1} × ${n2}`;
        }
    },

    addDigit(num) {
        if (this.userTyped.length < 3) {
            this.userTyped += num;
            this.updateDisplay();
        }
    },

    clearDigit() {
        this.userTyped = "";
        this.updateDisplay();
    },

    updateDisplay() {
        this.elements.display.innerText = this.userTyped;
    },

    checkAnswer() {
        if (this.userTyped === "") return;

        const val = parseInt(this.userTyped);
        if (val === this.currentAnswer) {
            this.handleSuccess();
        } else {
            this.handleFailure();
        }
    },

    handleSuccess() {
        this.score += 10;
        this.elements.score.innerText = this.score;
        this.elements.container.classList.add('success-flash');
        setTimeout(() => {
            this.elements.container.classList.remove('success-flash');
            this.generateQuestion();
        }, 400);
    },

    handleFailure() {
        this.elements.display.style.color = 'var(--sith-red)';
        setTimeout(() => {
            this.elements.display.style.color = 'var(--jedi-green)';
            this.clearDigit();
        }, 500);
    }
};