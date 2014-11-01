console.log(this.readyState);
document.getElementById("button").addEventListener("click", function() {
    document.getElementById("button").innerHTML="UNPAUSED";
    //storageTest("this message should be logged on the console");
});

storageTest("this message should be logged in console");
