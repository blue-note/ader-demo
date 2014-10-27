// this code is the content.js equivalent. It interacts with the webpage directly. 



var haunter = {
	elementChanger: function(request, sender, sendResponse) {
		var src2 = "http://img2.wikia.nocookie.net/__cb20090620065026/sonic/images/9/96/Super_Sonic_Trophy.jpg";
		if(document.location.href.replace(/#.*$/, "") === request.frameUrl){
			if(request.url != src2){
			console.log("attempting swap:",request.frameUrl,request.url);
			haunter.begin(request);
			}
		}
		sendResponse({});
	},

	begin: function(request){
		var type = request.type;
		var url = request.url;
		
		console.log("Object type:",type,url);
		
		var tags = {};
		tags['image'] = {IMG:1};
		tags['sub_frame'] = {IFRAME:1, FRAME:1};
		tags['object'] = {"OBJECT":1, EMBED:1};
	
		var srcdata = this._srcsFor(url);
		for (var i=0; i < srcdata.length; i++){
			for (var tag in tags[type]){
				var src = srcdata[i];
				var attr = (tag === "OBJECT" ? "data" : "src");
				var selector = tag + '[' + attr + src.op + '"' + src.text + '"]';
				
				var results = document.querySelectorAll(selector);
				if (results.length) {
					for (var j=0; j < results.length; j++) {
						this.swap(results[j],type);
					}
				
				}
			
			}
		}
	},


	swap: function(el, type){
		var src = "http://img2.wikia.nocookie.net/__cb20090620065026/sonic/images/9/96/Super_Sonic_Trophy.jpg";	

		console.log("el.nodename: ",el.nodeName);
		if(el.nodeName == "FRAME" | el.nodeName == "IMG" |
		el.nodeName == "IFRAME" | el.nodeName == "EMBED"){
			console.log("Ad found!","; type: ",type,"; ",el.src);
			el.src = src;
		}
		/*if (el.nodeName == "EMBED"){
		var clone = el.cloneNode(true);
		clone.setAttribute('src',src);
		el.parentNode.replaceChild(clone,el);
		
		
		}*/
		
		else if (type != "script"){
		el.style.setProperty("display", "none", "important");
		el.style.setProperty("visibility", "hidden", "important");
		el.style.setProperty("opacity", "0", "important");
		var w = (el.width === undefined ? -1 : el.width);
		var h = (el.height === undefined ? -1 : el.height);
		el.style.setProperty("background-position", w + "px " + h + "px");
		el.setAttribute("width", 0);
		el.setAttribute("height", 0);
		
		}
	
	},

	_srcsFor: function(url) {
		// NB: <img src="a#b"> causes a request for "a", not "a#b".  I'm
		// intentionally ignoring IMG tags that uselessly specify a fragment.
		// AdBlock will fail to hide them after blocking the image.
		var url_parts = parseUri(url), page_parts = document.location;
		var results = [];
		// Case 1: absolute (of the form "abc://de.f/ghi" or "//de.f/ghi")
		results.push({ op:"$=", text: url.match(/\:(\/\/.*)$/)[1] });
		if (url_parts.hostname === page_parts.hostname) {
		  var url_search_and_hash = url_parts.search + url_parts.hash;
		  // Case 2: The kind that starts with '/'
		  results.push({ op:"=", text: url_parts.pathname + url_search_and_hash });
		  // Case 3: Relative URL (of the form "ab.cd", "./ab.cd", "../ab.cd" and
		  // "./../ab.cd")
		  var page_dirs = page_parts.pathname.split('/');
		  var url_dirs = url_parts.pathname.split('/');
		  var i = 0;
		  while (page_dirs[i] === url_dirs[i] 
				 && i < page_dirs.length - 1 
				 && i < url_dirs.length - 1) {
			i++; // i is set to first differing position
		  }
		  var dir = new Array(page_dirs.length - i).join("../");
		  var path = url_dirs.slice(i).join("/") + url_search_and_hash;
		  if (dir) {
			results.push({ op:"$=", text: dir + path });
		  } else {
			results.push({ op:"=", text: path });
			results.push({ op:"=", text: "./" + path });
		  }
		}

		return results;
	  }
};

chrome.extension.onRequest.addListener(haunter.elementChanger);