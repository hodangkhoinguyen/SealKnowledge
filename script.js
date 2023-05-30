(function () {
    'use strict';
    console.log('JS reading');

    // changing screens from onboarding to begin game page
    document.querySelector('#continueGuest').addEventListener('click', function(event) {
        document.querySelector('.home').classList.add('hidden');
        document.querySelector('.beginGame').classList.remove('hidden');
	});

    // going back to onboarding from begin game page
    document.querySelector('#questionSelect').addEventListener('click', function(event) {
        document.querySelector('.teamSelect').classList.remove('hidden');
        document.querySelector('.beginGame').classList.add('hidden');
    })

    // going back to onboarding from begin game page
    document.querySelector('#backHome').addEventListener('click', function(event) {
        document.querySelector('.home').classList.remove('hidden');
        document.querySelector('.beginGame').classList.add('hidden');
    })

    // going back to begin game page from team select page
    document.querySelector('#backBegin').addEventListener('click', function(event) {
        document.querySelector('.beginGame').classList.remove('hidden');
        document.querySelector('.teamSelect').classList.add('hidden');
    })

})();