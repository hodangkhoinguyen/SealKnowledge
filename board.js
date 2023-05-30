(function() {
    'use strict';
    const board = document.getElementById("board-container");
    const upperRow = document.getElementById("upper-row");
    const lowerRow = document.getElementById("lower-row");
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");
    const mover = document.getElementsByClassName("bike-img")[0];

    const NUM_ROW = 5;
    const NUM_COL = 8;
    let cellList = [];
    let stepNum;
    let currIndex = 0;

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

    let currCell = cellList[currIndex];
    setMover(mover, currCell.offsetLeft, currCell.offsetTop);

    function setMover(moverObj, x, y) {
        moverObj.style.left = x + "px";
        moverObj.style.top = y + "px";
    }

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
        questionContainer.innerHTML = "";
        let problem = {
            question: "What is 1+1?",
            answers: ["A", "B", "C"],
            key: "A"
        };
        questionContainer.appendChild(createQuestion(problem));
    });

    function answerCorrectly() {
        currIndex += stepNum;
        currIndex = currIndex % cellList.length;
        currCell = cellList[currIndex];
        setMover(mover, currCell.offsetLeft, currCell.offsetTop);
    }

    function createQuestion(problem) {
        const questionDiv = document.createElement("section");
        const headerQuestion = document.createElement("h5");
        headerQuestion.textContent = "Question";
        questionDiv.appendChild(headerQuestion);

        const questionLabel = document.createElement("label");
        questionLabel.className = "question";
        questionLabel.textContent = problem.question;
        questionDiv.appendChild(questionLabel);

        const answerList = problem.answers;
        for (let answer of answerList) {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "q";
            input.value = answer;
            questionDiv.appendChild(input);

            const label = document.createElement("label");
            label.setAttribute("for", "q");
            label.textContent = answer;
            questionDiv.appendChild(label);
        }

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
                answerCorrectly();
            }
            questionContainer.classList.add("hidden");
            rollContainer.classList.remove("hidden");
        });

        questionDiv.appendChild(button);
        return questionDiv;
    }

    class Player {
        constructor() {

        }
    }

    class Square {
        constructor() {
            
        }
    }
})();   
