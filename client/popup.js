document.getElementById("button").addEventListener("click", function() {
    document.getElementById("button").innerHTML="UNPAUSED";
    //storageTest("this message should be logged on the console");
});
//testStorage();
//chrome.storage.sync.get(["allAds"], function(value) {console.log(value)});

testStorage();