// VANILLA VERSION - ADS DISABLED //

function initCpmstarAPI() {
    console.log("Ad system disabled - running in local mode");
}

window.fallbackToStar = window.fallbackToStar || function() {
    console.log("Ad system disabled - no ads to show");
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('MainManager', 'OnDaReveresedFinishedJS', 'Failed');
    }
};

function showMid() {
    console.log("Ad system disabled - showMid called but no ad shown");
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('MainManager', 'OnDaReveresedFinishedJS', 'Failed');
    }
}

function showRe() {
    console.log("Ad system disabled - showRe called but no ad shown");
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('MainManager', 'OnDaReveresedFinishedJS', 'Failed');
    }
}

function onAttempt1Failed(){
    console.log("Ad system disabled");
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('MainManager', 'OnDaReveresedFinishedJS', 'Failed');
    }
}

function gameplayStart() {
    console.log("Gameplay started - ads disabled");
}

function gameplayEnd() {
    console.log("Gameplay ended - ads disabled");
}
