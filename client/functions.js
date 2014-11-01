var serverURL = "http://ader.klgilbert.com/";


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
    //FIX THIS: THIS MUST ACCESS FILTERED AD OBJECT AND RETURN THE CORRECT NUMBER OF ADS
 
}

function createAccount(username, password) {

 data = {"username": username, "password": password};
    
 $.getJSON(serverURL, data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
  downloadAds();
    
}

function loginAccount(username, password) {
    
    data = {"username": username, "password": password};
    $.getJSON(serverURL, data, function(data) { /*data will be a web token which needs to get put in local storage. if returned error, return error*/  });
    
}
function saveAdPrefs(prefs) {
 //save prefs in webtoken in local storage 
    downloadAds();
    filterAds();
    
}
  
function downloadAds() {
 //download ads from database and put in local storage
    
    var ads = []; 
    
    data = {"adCount": adCount};
    $.getJSON("http://ader.klgilbert.com/", data, function(data) { 
        //data will be an object of ad urls
        $.each(data, function(index, value) {
            //iterate through the data, append each ad url to the ads array
            ads.push(value);         
        });
           
    });
    return ads;
    
}
    
function filterAds() {
  //uses preferences from web token and creates new (or overwrites) filtered ad object in local storage  
    
    
}
    
    
function storageTest(message) {
    console.log("successfully called storageTest");
    var data = {"message":message};
    chrome.storage.local.set(data, function(data) {
     chrome.storage.local.get(["message"], function(value) {
         console.log(value);        
     })
    });
}

console.log("functions online");

    
    



  