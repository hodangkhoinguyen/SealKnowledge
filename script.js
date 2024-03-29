(function () {
    'use strict';
    console.log('JS reading');

    // going BACK to onboarding from begin game page
    document.querySelector('#playNow').addEventListener('click', function(event) {
        document.querySelector('.home').classList.add('hidden');
        document.querySelector('.teamSelect').classList.remove('hidden');
    });
    
    // going BACK to begin game page from team select page 
    document.querySelector('#backBegin').addEventListener('click', function(event) {
        document.querySelector('.home').classList.remove('hidden');
        document.querySelector('.teamSelect').classList.add('hidden');
    });

    /* OVERLAY FOR RULES */
    // open overlay
    document.querySelector('.ruleBtn').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').style.display = 'flex';
    });

    // closing overlay
    document.querySelector('.closeRule').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').style.display = 'none';
    });

    const startButton = document.getElementById("startBtn");
    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        const inputTeamName = document.getElementsByClassName("teamname");
        let teamname = [];
        // If the teamnames are not filled out
        for (let i of inputTeamName) {
            if (i.value === "") {
                // alert("You need to enter all team names");
                document.getElementById("teamname-warning-container").style.display = 'block';
                return;
            }
        }

        for (let i of inputTeamName) {
            teamname.push(i.value);
        }

        localStorage.setItem("teamname", JSON.stringify(teamname));
        window.location.href = 'board/board.html';
    });

    document.getElementById('closeWarning').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById("teamname-warning-container").style.display = 'none';
    })
})();