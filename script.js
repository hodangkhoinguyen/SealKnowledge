(function () {
    'use strict';
    console.log('JS reading');

    // changing screens from onboarding to begin game page
    document.querySelector('#continueGuest').addEventListener('click', function(event) {
        document.querySelector('.onboarding').classList.add('hidden');
        document.querySelector('.beginGame').classList.remove('hidden');
	});

    // going back to onboarding from begin game page
    document.querySelector('.fa-arrow-left').addEventListener('click', function(event) {
        document.querySelector('.onboarding').classList.remove('hidden');
        document.querySelector('.beginGame').classList.add('hidden');
    })

})();