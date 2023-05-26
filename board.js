(function() {
    'use strict';
    const board = document.getElementById("board-container");
    const firstRow = document.getElementsByClassName("row")[0];
    const lastRow = document.getElementsByClassName("row")[1];
    const firstColumn = document.getElementsByClassName("column")[0];
    const lastColumn = document.getElementsByClassName("column")[1];
    const NUM_ROW = 5;
    const NUM_COL = 8;

    // First and last row
    for (let i = 0; i < NUM_COL; i++) {
        let cell = document.createElement("section");
        cell.className = "cell";
        firstRow.appendChild(cell);
        cell = document.createElement("section");
        cell.className = "cell";
        lastRow.appendChild(cell);
    }

    for (let i = 0; i < NUM_ROW - 2; i++) {
        let cell = document.createElement("section");
        cell.className = "cell";
        firstColumn.appendChild(cell);
        cell = document.createElement("section");
        cell.className = "cell";
        lastColumn.appendChild(cell);
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
