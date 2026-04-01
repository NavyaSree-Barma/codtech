document.getElementById("showReport").addEventListener("click", function(){

    chrome.storage.local.get(["timeData"], function(result){

        let data = result.timeData || {};
        let reportList = document.getElementById("reportList");

        reportList.innerHTML = "";

        for(let site in data){

            let minutes = (data[site] / 60000).toFixed(2);

            let li = document.createElement("li");
            li.textContent = site + " : " + minutes + " minutes";

            reportList.appendChild(li);
        }

    });

});