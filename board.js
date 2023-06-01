(function() {
    'use strict';
    
    class Player {
        static cellList;
        static currTurn;

        constructor(position, moverSymbol, variableX, variableY) {
            this.position = position;
            this.moverSymbol = moverSymbol;
            this.variableX = variableX;
            this.variableY = variableY;
        }

        move(num = 0) {
            this.position += num;
            this.position %= cellList.length;
            let currCell = cellList[this.position];
            this.moverSymbol.style.left = currCell.offsetLeft + this.variableX + "px";
            this.moverSymbol.style.top = currCell.offsetTop + this.variableY + "px";
        }

        static nextTurn() {
            Player.currTurn = (Player.currTurn + 1) % 4;
        }
    }

    const upperRow = document.getElementById("upper-row");
    const lowerRow = document.getElementById("lower-row");
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");
    const mover1 = document.getElementsByClassName("bike-img")[0];
    const mover2 = document.getElementsByClassName("bike-img")[1];
    const mover3 = document.getElementsByClassName("bike-img")[2];
    const mover4 = document.getElementsByClassName("bike-img")[3];

    const NUM_ROW = 5;
    const NUM_COL = 8;
    let cellList = [];
    let stepNum;

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
        cell.className = "cell";
        cell.textContent = num;
        return cell;
    }

    const playerList = [
        new Player(0, mover1, 0, 0),
        new Player(0, mover2, 0, 60),
        new Player(0, mover3, 60, 0),
        new Player(0, mover4, 60, 60)
    ];

    playerList.forEach(p => p.move());
    Player.cellList = cellList;
    Player.currTurn = 0;

    const rollContainer = document.getElementsByClassName("roll-container")[0];
    const questionContainer = document.getElementsByClassName("question-container")[0];
    const rollBtn = document.getElementById("rollBtn");
    const rollResult = document.getElementsByClassName("roll-result")[0];
    const rollResultContainer = document.getElementsByClassName("roll-result-container")[0];
    rollBtn.addEventListener("click", function () {
        stepNum = Math.floor(Math.random() * 6) + 1;
        rollResult.textContent = stepNum;
        rollResultContainer.classList.remove("hidden");
        rollBtn.classList.add("hidden");
    });

    const nextBtn = document.getElementById("nextQuestion");
    nextBtn.addEventListener("click", function () {
        rollBtn.classList.remove("hidden");
        rollResultContainer.classList.add("hidden");
        rollContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        let problem = {
            question: "What is the name of this animal?",
            answers: ["Blue Heron", "Muskrat", "Frog"],
            key: "Blue Heron"
        };

        questionContainer.innerHTML = "";
        questionContainer.appendChild(createQuestion(problem));
    });

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

        const answerList = problem.answers;
        for (let answer of answerList) {
            const sectionAnswer = document.createElement("section");
            sectionAnswer.className = "answer-item";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "q";
            input.value = answer;
            sectionAnswer.appendChild(input);

            const label = document.createElement("label");
            label.setAttribute("for", "q");
            label.textContent = answer;
            sectionAnswer.appendChild(label);
            questionDiv.appendChild(sectionAnswer);
        }

        // const newDiv = document.createElement("div");
        // const wrongMessage = document.createTextNode("Sorry, you got the answer wrong and got a flat tire :(");
        const answerKey = problem.key;
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
            if (isCorrect) {
                console.log(playerList);
                console.log(stepNum);
                console.log(Player.currTurn);
                playerList[Player.currTurn].move(stepNum);
            } 
            // else {
            //     newDiv.appendChild(wrongMessage);
            // }
            questionContainer.classList.add("hidden");
            rollContainer.classList.remove("hidden");
        });

        questionDiv.appendChild(button);
        Player.nextTurn();
        return questionDiv;
    }
})();

