(function () {
    'use strict';

    class Player {
        static cellList;
        static currTurn;

        constructor(name, position, moverSymbol, variableX, variableY) {
            this.position = position;
            this.moverSymbol = moverSymbol;
            this.variableX = variableX;
            this.variableY = variableY;
            this.name = name;
        }

        move(num = 0) {
            this.position += num;
            this.position %= cellList.length;
            let currCell = cellList[this.position];
            this.moverSymbol.style.left = currCell.getBoundingClientRect().left + this.variableX + "px";
            this.moverSymbol.style.top = currCell.getBoundingClientRect().top + this.variableY + "px";
        }

        static nextTurn() {
            Player.currTurn = (Player.currTurn + 1) % 4;
        }
    }

    let questionList;

    const boardContainer = document.getElementsByClassName("board-container")[0];
    const upperRow = document.getElementById("upper-row");
    const lowerRow = document.getElementById("lower-row");
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");
    const mover1 = document.getElementsByClassName("bike-img")[0];
    const mover2 = document.getElementsByClassName("bike-img")[1];
    const mover3 = document.getElementsByClassName("bike-img")[2];
    const mover4 = document.getElementsByClassName("bike-img")[3];

    const teamname = JSON.parse(localStorage.getItem("teamname"));
    const NUM_ROW = 5;
    const NUM_COL = 8;
    let cellList = [];
    let stepNum;
    let playerList;

    const rollContainer = document.getElementsByClassName("roll-container")[0];
    const diceContainer = document.getElementsByClassName("dice-container")[0];
    const questionContainer = document.getElementsByClassName("question-container")[0];
    const rollBtn = document.getElementById("rollBtn");
    const rollResult = document.getElementsByClassName("roll-result")[0];
    const rollResultContainer = document.getElementsByClassName("roll-result-container")[0];
    const displayTurn = document.getElementsByClassName("turn-display")[0];

    const statusContainer = document.getElementsByClassName("status-container")[0];
    const answerResult = document.getElementsByClassName("answer-result")[0];
    const nextTeamBtn = document.getElementById("nextTeamBtn");

    async function getQuestionList() {
        const questionJson = await fetch('../mock_questions.json');
        questionList = await questionJson.json();
    };

    function setUp() {
        // First row
        for (let i = 0; i < NUM_COL; i++) {
            const newCell = createCell(cellList.length + 1);
            cellList.push(newCell);
            upperRow.appendChild(newCell);
        }

        // Right Column
        for (let i = 0; i < NUM_ROW - 2; i++) {
            const newCell = createCell(cellList.length + 1);
            cellList.push(newCell);
            rightColumn.appendChild(newCell);
        }

        // Last row
        for (let i = 0; i < NUM_COL; i++) {
            const newCell = createCell(cellList.length + 1);
            cellList.push(newCell);
            lowerRow.appendChild(newCell);
        }

        // Left Column
        for (let i = 0; i < NUM_ROW - 2; i++) {
            const newCell = createCell(cellList.length + 1);
            cellList.push(newCell);
            leftColumn.appendChild(newCell);
        }

        function createCell(num) {
            const cell = document.createElement("section");
            cell.className = `cell cell-${num}`;
            cell.textContent = num;
            return cell;
        }

        // Add a specific classname for the first cell
        cellList[0].classList.add("first-cell");

        playerList = [
            new Player(teamname[0], 0, mover1, 8, 8),
            new Player(teamname[1], 0, mover2, 8, 75),
            new Player(teamname[2], 0, mover3, 75, 8),
            new Player(teamname[3], 0, mover4, 75, 75)
        ];

        playerList.forEach(p => p.move(0));
        Player.cellList = cellList;
        Player.currTurn = 0;
        displayTurn.textContent = `${playerList[Player.currTurn].name}'s turn`;

        rollBtn.addEventListener("click", function () {
            stepNum = Math.floor(Math.random() * 6) + 1;
            rollResult.textContent = stepNum;
            rollResultContainer.classList.remove("hidden");
            rollContainer.classList.add("hidden");
        });

        const nextBtn = document.getElementById("nextQuestion");
        nextBtn.addEventListener("click", function () {
            rollContainer.classList.remove("hidden");
            rollResultContainer.classList.add("hidden");
            diceContainer.classList.add("hidden");
            questionContainer.classList.remove("hidden");
            const randomNum = Math.floor(Math.random() * questionList.length);
            let problem = questionList[randomNum];

            questionContainer.innerHTML = "";
            questionContainer.appendChild(createQuestion(problem));
            questionContainer.appendChild(createImageQuestion(problem));
        });
    }

    function createQuestion(problem) {
        const questionDiv = document.createElement("section");
        questionDiv.className = "question-display";
        const headerQuestion = document.createElement("h3");
        headerQuestion.textContent = "Question";
        questionDiv.appendChild(headerQuestion);

        const questionLabel = document.createElement("label");
        questionLabel.className = "question-item";
        questionLabel.textContent = problem.question;
        questionDiv.appendChild(questionLabel);

        const answerList = problem.options;
        for (let answer of answerList) {
            const sectionAnswer = document.createElement("section");
            sectionAnswer.className = "answer-item";

            const input = document.createElement("input");
            input.id = answer;
            input.type = "radio";
            input.name = "q";
            input.value = answer;
            sectionAnswer.appendChild(input);

            const label = document.createElement("label");
            label.setAttribute("for", answer);
            label.textContent = answer;
            sectionAnswer.appendChild(label);
            questionDiv.appendChild(sectionAnswer);
        }

        // const newDiv = document.createElement("div");
        // const wrongMessage = document.createTextNode("Sorry, you got the answer wrong and got a flat tire :(");
        const answerKey = problem.answer;
        const button = document.createElement("button");
        button.textContent = "Submit Answer";
        button.addEventListener("click", function () {
            let answerList = document.getElementsByName("q");
            let isCorrect = false;
            for (let answer of answerList) {
                // Find the picked option
                if (answer.checked) {
                    if (answer.value === answerKey) {
                        isCorrect = true;
                        break;
                    }
                }
            }
            questionContainer.classList.add("hidden");
            displayStatus(isCorrect);
        });

        questionDiv.appendChild(button);
        return questionDiv;
    }

    function displayStatus(isCorrect) {
        statusContainer.classList.remove("hidden");
        if (isCorrect) {
            answerResult.textContent = `Yay, the answer is correct! You will now move ${stepNum} steps :)`;
            if (playerList[Player.currTurn].position + stepNum >= Player.cellList.length) {
                boardContainer.classList.add("hidden");
                displayFinalResult(playerList[Player.currTurn]);
                return;
            }
            else {
                playerList[Player.currTurn].move(stepNum);
            }
        }
        else {
            answerResult.textContent = `Oh no, the answer is incorrect. You have a flat tire for this round :(`;
        }
        Player.nextTurn();

        nextTeamBtn.addEventListener("click", function () {
            diceContainer.classList.remove("hidden");
            statusContainer.classList.add("hidden");
            displayTurn.textContent = `${playerList[Player.currTurn].name}'s turn`;
        });
    }

    function createImageQuestion(problem) {
        const questionDiv = document.createElement("section");
        questionDiv.className = "question-image";
        questionDiv.innerHTML = "<img src='../images/a_blueheron.png'/>";
        return questionDiv;
    }
    const finalResultContainer = document.getElementsByClassName("final-result")[0];
    function displayFinalResult(player) {
        finalResultContainer.classList.remove("hidden");
        const teamWinner = document.getElementsByClassName("team-winner")[0];
        teamWinner.textContent = player.name;

        // returning back to home page
        document.querySelector('#returnHome').addEventListener('click', function (event) {
            window.location.href = '../index.html';
        });
    }

    getQuestionList()
        .then(() => {
            setUp();
        })
})();

