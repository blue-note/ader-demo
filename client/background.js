


frameData = {

	get: function(tabId, frameId){
		if(frameId !== undefined){
		//console.log("(Get) TabID: "+tabId+"; frameID: "+frameId);
		return (frameData[tabId] || {})[frameId];
		}
		return frameData[tabId];
	},
	
	record: function(tabId, frameId, url, type){
		console.log("(Record) TabID: "+tabId+"; frameID: "+frameId+"; url: "+url+"; type: "+type);
		var fd = frameData;
		if(!fd[tabId]) fd[tabId] = {};
		fd[tabId][frameId] = {
			url: url,
			domain: parseUri(url).hostname,
			type: type
		};
	
	},
		
		
	track: function(details){
		var fd = frameData;
		//if(!fd[tabId])fd[tabId] = {};
		var tabId = details.tabId; 
		var type = details.type; 
		var frameId = details.frameId;
		var emptyframe = (details.type === 'sub_frame' ? details.parentFrameId: details.frameId)
		var url = details.url;
		
		if(tabId == -1){ 
			console.log("ignoring background; tabId: -1");
			return false;
		}
		if(type === 'main_frame'){
			delete fd[tabId];
			fd.record(tabId,0,url,type);
			fd[tabId].blocked = 0;
			console.log("main; Tab Id: "+tabId+"; frameId: "+frameId+"; type: "+type);
			return true;
		}
		if (!fd[tabId]){
			console.log("unknown/old tabID");
			return false; 
		}
				//GET USED HERE **** * * * 
		if (undefined === fd.get(tabId, emptyframe)){
			console.log("empty frame", tabId, emptyframe, "; assign it tab's url");
			fd.record(tabId,emptyframe,url,type);
		}
		
		if (details.type === 'sub_frame'){
			fd.record(tabId, details.frameId, url, type);
			console.log("Tracking sub_frame",tabId,details.frameId,url);
		}		
		return true;	
	}
};

		
function onBeforeRequestHandler(details) {
	// turn details.type into a string and pass it 
	if (!frameData.track(details))
		return {cancel: false};
		
	var tabId = details.tabId;
	var url = details.url;
	var frameId = details.frameId;

	var type = details.type;
	console.log("Reveal Type: "+details.type, "; url: ",url);
	
	

			
	var requestingFrameId = (type === 'sub_frame' ? details.parentFrameId : details.frameId);
			// GET USED HERE *** ** * * * 
	var frameDomain = frameData.get(tabId,requestingFrameId).domain;
	var block = false;
	var newDomain = parseUri(details.url).hostname;
	if(frameDomain != newDomain)
		{
		console.log("(BLOCK)frame domain doesn't match. ", frameDomain, newDomain);
		frameData[tabId].blocked += 1;
		block = true;
		}
	if(block && (type == "image" | type == "sub_frame" | type == "object")){
		// GET GET GET HERE
		var frameUrl = frameData.get(tabId, requestingFrameId).url.replace(/#.*$/, "");
		var data = {type: type, frameUrl: frameUrl, url:url};
		chrome.tabs.sendRequest(tabId, data);
	}

}


chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestHandler, {urls: ["http://*/*", "https://*/*"]}, ["blocking"]);
console.log("The app is alive.");

