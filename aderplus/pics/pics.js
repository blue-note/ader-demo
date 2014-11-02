//initial files 


function imgObj(filename, width, length,interest) {
    this.url = chrome.extension.getURL(interest+"/"+filename);
    this.width = width;
    this.length = length;
    this.name = filename;
    this.interest = interest;
    }

var f = "fashion";
var t = "tech";
var m = "mis";

var imageArray = [new imgObj("Beyonce160x600.jpg", 160, 600, f),
                 new imgObj("blackmaillot336x280.jpg",336, 280,f),
                 new imgObj("Bootiful336x280.jpg",336 ,280, f),
                 new imgObj("candy.gif",300,250, f),
                  new imgObj("GDN336x280.jpg",336,280,f),
                  new imgObj("gilt_banner.jpg",620,250,f),
                  new imgObj("harlow.jpg",300,250,f),
                  new imgObj("LadyGaga728x90.jpg",728,90,f),
                  new imgObj("mbl_300x600.jpg",300,600,f),
                  new imgObj("plush.jpg",336,280,f),
                  new imgObj("Sephora728x90.jpg",728,90,f),
                  new imgObj("Sept160x600.jpg",160,600,f),
                  new imgObj("stila.gif",300,250,f),
                  new imgObj("Tootsies160x600.png",160,600,f),
                  new imgObj("alienware_160x600.png",160,600,t),
                  new imgObj("crunchy_160x600.jpg",160,600,t),
                  new imgObj("DS336x280.jpg",336,280,t),
                  new imgObj("iphone160x600.jpg",160,600,t),
                  new imgObj("javascript214x178.jpg",214,178,t),
                  new imgObj("kindle300x250.jpg",300,250,t),
                  new imgObj("onslaught729x90.jpg",729,90,t),
                  new imgObj("ps3_300x250.png",300,250,t),
                  new imgObj("ros336x280.png",336,280,t),
                  new imgObj("rumble336x280.jpg",336,280,t),
                  new imgObj("V3_336x280.jpg",336,280,t),
                  new imgObj("WOW160x600.png",160,600,t),
                  new imgObj("barack.jpg",300,250,m)];

function returnImages() {
    return imageArray;
    
}

function initPics(){
    //if(null == localStorage["initialized"]){
        localStorage["initialized"] = 1;
        //localStorage["allImages"] = imageArray;
        chrome.storage.sync.set({"allImages":imageArray}, function() {  
            console.log("imageArray"+ imageArray);
        });
        
   // }
}

