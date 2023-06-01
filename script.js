(function () {
    'use strict';
    console.log('JS reading');

    // changing screens from onboarding to begin game page
    document.querySelector('#continueGuest').addEventListener('click', function(event) {
        document.querySelector('.home').classList.add('hidden');
        document.querySelector('.beginGame').classList.remove('hidden');
	});

    // patwin people page
    document.querySelector('#patwin').addEventListener('click', function(event) {
        document.querySelector('.beginGame').classList.add('hidden');
        document.querySelector('#patwinPage').classList.remove('hidden');
	});
    // exiting patwin people page
    document.querySelector('#backTopic').addEventListener('click', function(event) {
        document.querySelector('.beginGame').classList.remove('hidden');
        document.querySelector('#patwinPage').classList.add('hidden');
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
    document.querySelector('.fa-question').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').className = 'show';
    });
    // closing overlay
    document.querySelector('.closeRule').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('rules').className = 'hidden';
    });


/* BUTTON INTERACTION FOR THE USER TEST INSTRUCTIONS*/
    // open overlay
    document.querySelector('.open').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('overlay').className = 'show';
    });
    // closing overlay
    document.querySelector('.close').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('overlay').className = 'hidden';
    });

/* login button overlay */
    document.querySelector('#login').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#loginOverlay').className = 'show';
    });
    // closing overlay
    document.querySelector('#closeOverlay').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#loginOverlay').className = 'hidden';
    });

    const startBtn = document.getElementById("start-game");
    startBtn.addEventListener("click", function() {
        const inputTeamName = document.getElementsByClassName("teamname");
        let teamname = [];
        for (let i of inputTeamName) {
            teamname.push(i.value);
        }
        localStorage.setItem("teamname", JSON.stringify(teamname));
        window.location.href = "./SealKnowledge/board.html";
    });    
})();