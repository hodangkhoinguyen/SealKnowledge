(function () {
    'use strict';
    console.log('JS reading');

    // changing screens from onboarding to begin game page
    document.querySelector('#continueGuest').addEventListener('click', function(event) {
        document.querySelector('.home').classList.add('hidden');
        document.querySelector('.beginGame').classList.remove('hidden');
	});

    // going BACK to onboarding from begin game page
    document.querySelector('#questionSelect').addEventListener('click', function(event) {
        document.querySelector('.teamSelect').classList.remove('hidden');
        document.querySelector('.beginGame').classList.add('hidden');
    });

    // going BACK to onboarding from begin game page
    document.querySelector('#backHome').addEventListener('click', function(event) {
        document.querySelector('.home').classList.remove('hidden');
        document.querySelector('.beginGame').classList.add('hidden');
    });
    
    // going BACK to begin game page from team select page 
    document.querySelector('#backBegin').addEventListener('click', function(event) {
        document.querySelector('.beginGame').classList.remove('hidden');
        document.querySelector('.teamSelect').classList.add('hidden');
    });

/* OVERLAY FOR RULES */
    // open overlay
    document.querySelector('.ruleBtn').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').classList.remove('hidden');
    });
    // closing overlay
    document.querySelector('.closeRule').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').classList.add('hidden');
    });

/* login button overlay */
    document.querySelector('#login').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#loginOverlay').classList.remove('hidden');
    });
    // closing overlay
    document.querySelector('#closeOverlay').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#loginOverlay').classList.add('hidden');
    });

    const startBtn = document.getElementById("start-game");
    startBtn.addEventListener("click", function() {
        const inputTeamName = document.getElementsByClassName("teamname");
        let teamname = [];
        for (let i of inputTeamName) {
            teamname.push(i.value);
        }

        localStorage.setItem("teamname", JSON.stringify(teamname));
        window.location.href = 'board/board.html';
    });    
})();