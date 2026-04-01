let startTime = Date.now();
let currentSite = "";

chrome.tabs.onActivated.addListener(function(activeInfo) {

    chrome.tabs.get(activeInfo.tabId, function(tab) {

        if(tab.url){

            updateTime();

            let url = new URL(tab.url);
            currentSite = url.hostname;

            startTime = Date.now();
        }

    });

});

function updateTime(){

    let timeSpent = Date.now() - startTime;

    chrome.storage.local.get(["timeData"], function(result){

        let data = result.timeData || {};

        if(!data[currentSite]){
            data[currentSite] = 0;
        }

        data[currentSite] += timeSpent;

        chrome.storage.local.set({timeData : data});

    });

}