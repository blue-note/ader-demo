var serverURL = "http://ader.klgilbert.com/";
var devServerURL = "http://localhost:9000/";


// Parse a URL. Based upon http://blog.stevenlevithan.com/archives/parseuri
// parseUri 1.2.2, (c) Steven Levithan <stevenlevithan.com>, MIT License
// Inputs: url: the URL you want to parse
// Outputs: object containing all parts of |url| as attributes

VERBOSE_DEBUG = true;

parseUri = function(url) {
  var matches = /^(([^:]+(?::|$))(?:(?:\w+:)?\/\/)?(?:[^:@\/]*(?::[^:@\/]*)?@)?(([^:\/?#]*)(?::(\d*))?))((?:[^?#\/]*\/)*[^?#]*)(\?[^#]*)?(\#.*)?/.exec(url);
  // The key values are identical to the JS location object values for that key
  var keys = ["href", "origin", "protocol", "host", "hostname", "port",
              "pathname", "search", "hash"];
  var uri = {};
  for (var i=0; (matches && i<keys.length); i++)
    uri[keys[i]] = matches[i] || "";
  return uri;
};

// Parses the search part of a URL into an key: value object.
// e.g., ?hello=world&ext=adblock would become {hello:"world", ext:"adblock"}
// Inputs: search: the search query of a URL. Must have &-separated values.
parseUri.parseSearch = function(search) {
  // Fails if a key exists twice (e.g., ?a=foo&a=bar would return {a:"bar"}
  var queryKeys = {};
  search.replace(/(?:^\?|&)([^&=]*)=?([^&]*)/g, function () {
    if (arguments[1]) queryKeys[arguments[1]] = unescape(arguments[2]);
  });
  return queryKeys;
};

// Strip third+ level domain names from the domain and return the result.
// Inputs: domain: the domain that should be parsed
//         keepDot: true if trailing dots should be preserved in the domain
// Returns: the parsed domain

parseUri.secondLevelDomainOnly = function(domain, keepDot) {
  var match = domain.match(/([^\.]+\.(?:co\.)?[^\.]+)\.?$/) || [domain, domain];
  return match[keepDot ? 0 : 1].toLowerCase();
};

/* DATABASE VERSION
function retrieveAds(adsToShow) {
    //output should be: url1,url2,url3,url1
    var ads = [];
    var newCount;
    //get counter
    chrome.storage.sync.set({"adCounter":"0"});//take this out later
    chrome.storage.sync.set({"filteredAds":{"ad1":"url1", "ad2":"url2","ad3":"url3"}});
   
    chrome.storage.sync.get(["adCounter"], function(counter) 
    { 
        //count is how many ads in this list we have incremented through previously
        var count = counter.adCounter;
        //console.log("adCounter: "+count);
        //copy new counter that will get incremented and re-stored
        newCount = count;
        
        //get filtered ads   
    chrome.storage.sync.get(["filteredAds"], function(adList) {
        var adsArray = $.map(adList.filteredAds, function(el) { return el; });
        //console.log("adsArray: "+adsArray);
        //var arr = $.map(adList, function(el) { return el; });
        //var adsArray = $.map(arr[0], function(el) { return el; });   
        var length = adsArray.length;
        //console.log("adsArray length:" + length);
        
        //i: number of ads i've incremented through in this loop
        //count: index of ads I should start incrementing at
        //newCount = count: new counter for how many ads I've incremented through total
        
        /* I have adsArray. I need to start at index count and increment #adsToShow number of times. whenever I get to the length of the array, I need to reset newCount to 0
        i will be how many times i've incremented, from 0 to adsToShow
        newCount will be the index I'm pulling the value from.
        
        */ /*
        
        var i = 0;
        while (i < adsToShow) {
         if (newCount >= length) {
          newCount = 0;   
         }
        ads.push(adsArray[newCount]);
        newCount++;
        i++;
        console.log("ads to display:" + ads);
        }
       
        console.log("newCount before callback: " + newCount);
        if (i >= adsToShow) {
              //to make sure that this is called after the loop is finished
    console.log("newCount before setting is:" + newCount);
    chrome.storage.sync.set({"adCounter":newCount});
    chrome.storage.sync.get(["adCounter"], function(count) {
    console.log("newCount in storage is:" +  count.adCounter);
        });
        }    
          
       });
                
    });
  
    return ads;    
    }
    
*/
function createAccount(email, password) {

 var data = {"email": email, "password": password};
    
 $.getJSON(devServerURL+"register", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
  //downloadAds();
    //initializing local storage attributes
  chrome.storage.sync.set({"adCounter":"0"}); 
  chrome.storage.sync.set({"isPaused":"false"});
  chrome.storage.sync.set({"sumImpressions":"0"});
  chrome.storage.sync.set({"sumEarnings":"0"});
}

function loginAccount(email, password) {
    
    var data = {"username": username, "password": password};
    $.getJSON(devServerURL+"login", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
    
}

function isPaused() {
 chrome.storage.sync.get(["isPaused"], function(data) {
   pause = data.isPaused;
   return pause;
   
         
 });
    
}
    
function flipPause() {
   chrome.storage.sync.get(["isPaused"], function(data) {
   pause = data.isPaused;
       console.log("pause before:"+pause);
   if (pause == "false") {
   chrome.storage.sync.set({"isPaused":"true"});    
   }
   else {
     chrome.storage.sync.set({"isPaused":"false"});   
   }
   
         
 }); 
       
}
    
function saveAdPrefs(prefs) {
 //sample prefs object:
    var prefs = {
      "0":"fashion",
      "1":"cosmetics",
       "2":"music"
    }
    //filterAds(prefs);
    //save user prefs in local storage
    chrome.storage.sync.set({"preferences":prefs});
}


/* DATABASE VERSION
function filterAds(prefs) {
  //uses preferences from web token and creates new (or overwrites) filtered ad object in local storage 
    data = prefs;
   $.getJSON(devServerURL, data, function(data) { 
        //data will be a key-value object of indexes to ad urls that are filtered based on prefs
          data = {"ad1":"url1","ad2":"url2"};
          chrome.storage.sync.set({"filteredAds":data});
          }); 
    
}

*/
  
function downloadAds() {
 //download ads from database and put in local storage
    
    var ads = {}; 
    data = {"query": "downloadAds"};
    $.getJSON(devServerURL, data, function(data) { 
        //data will be a key-value object of indexes to ad urls
          data = {"ad1":"url1","ad2":"url2"};
          chrome.storage.sync.set({"allAds":data}, function() {
           console.log("set preferences");   
            testStorage();
          });
    });
    
}
 

function incrementImpressions(num) {
    chrome.storage.sync.get(["sumImpressions"], function(data) {
        currImpressions = data.sumImpressions;
        newImpressions = parseInt(currImpressions) + num; 
    chrome.storage.sync.set({"sumImpressions":newImpressions}, function() {
       calculateEarnings();       
    });
    });
    return newImpressions;
}

function calculateEarnings() {
    chrome.storage.sync.get(["sumImpressions"], function(data) {
       var impressions = data.sumImpressions; 
       var earnings = (impressions/1000)*3;
       chrome.storage.sync.set({"sumEarnings":earnings}); 
        
    });
    
    return earnings;
}


function createPrefLists() {    
  var fashion = ["http://www.myredglasses.com/wp-content/uploads/2014/09/Tootsies-Digita-Ads-My-Red-Glasses-Blog-160x600-v1.png", "http://blog.freepeople.com/wp-content/uploads/2014/09/Sept_160x600.jpg", "http://www.myredglasses.com/wp-content/uploads/2014/09/Tootsies-Digita-Ads-My-Red-Glasses-Blog-160x600-v1.png"];
  var cosmetics = ["http://www.shareasale.com/image/49325/halloween_v1_banners-336x280.jpg", "http://www.sephora.com/contentimages/affiliates/freegift_728x90.jpg" ];
  var music = ["http://evoke.la/images/LadyGaga/PRG728x90.jpg", "http://www.ihiphopmusic.com/wp-content/uploads/2010/04/Ads-160x600.jpg"];
  var prefObj = {"fashion": fashion, "cosmetics":cosmetics, "music":music};
  return prefObj;  
    
}


function retrieveAds() {
    //an object which contains the three preference lists and a function getNext which pops out one url successively
   var adsGen = {};
   adsGen.prefObj = createPrefLists();
   adsGen.next = "fashion";
   adsGen.i = 0;
   adsGen.j = 0;
   adsGen.k = 0;
   adsGen.getNext = function() {
       if (adsGen.next == "fashion") {
        adsGen.next = "cosmetics";
        return adsGen.prefObj.cosmetics[adsGen.i];
           adsGen.i++;
           if (i >= adsGen.prefObj."fashion".length)
               adsGen.i = 0;
       }
        else if (adsGen.next == "cosmetics") {
            adsGen.next = "music";
            return adsGen.prefObj.cosmetics[adsGen.j];  
            adsGen.j++;
              if (j >= adsGen.prefObj."cosmetics".length)
               adsGen.j = 0;
        }
       
       else {
           adsGen.next = "fashion";
           return adsGen.prefObj.music[adsGen.k];
           adsGen.k++; 
             if (k >= adsGen.prefObj."music".length)
               adsGen.k = 0;
       }
       
       //need to post these to popup
       incrementImpressions(1);
       calculateEarnings();
   }
    
   return adsGen; 
}

function testAds() {
    var ads = retrieveAds();
    var i = 0;
    while (i < 10) {
    console.log("nextad "+ ads.next + " " + ads.getNext()); 
    i++;
    }
       
}


    
function testStorage() {
   chrome.storage.sync.set({"allAds": {"ad1":"url1","ad2":"url2", "ad3":"url3"}});
   chrome.storage.sync.get(["allAds"], function(value) {
     console.log(value);
     console.log(Object.keys(value).length);
   });
    
}
    


    
    



  