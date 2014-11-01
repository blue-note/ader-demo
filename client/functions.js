var serverURL = "http://ader.klgilbert.com/";
var devServerURL = "http://172.26.5.87:9000/";


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

function retrieveAds(adCount) {
    var ads = [];
    //get counter
    chrome.storage.sync.set({"adCounter":"5"});
    chrome.storage.sync.get(["adCounter"], function(counter) 
    { 
        count = parseInt(counter);
        newCount = count;
    //get filtered ads
        
    chrome.storage.sync.get(["filteredAds"], function(adList) {
        $.each(adList, function(index, value) {
            if (index >= count && index <= (count + adCount)) {
                ads.push(value);
                newCount++;
            }
                
        });
        
    });

    });
    
}

function createAccount(email, password) {

 data = {"email": email, "password": password};
    
 $.getJSON(devServerURL+"register", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
  //downloadAds();
  chrome.storage.sync.set({"adCounter":"0"}); 
}

function loginAccount(email, password) {
    
    data = {"username": username, "password": password};
    $.getJSON(devServerURL+"login", data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
    
}
    
function saveAdPrefs(prefs) {
 // 
    downloadAds();
    filterAds();
    
}
  
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
          })
    });
    
}
    
function filterAds() {
  //uses preferences from web token and creates new (or overwrites) filtered ad object in local storage  
    
    
}
    
function testStorage() {
   chrome.storage.sync.set({"allAds": {"ad1":"url1","ad2":"url2", "ad3":"url3"}});
   chrome.storage.sync.get(["allAds"], function(value) {
     console.log(value);
     console.log(Object.keys(value).length);
   });
    
}
    


    
    



  