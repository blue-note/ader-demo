//binary search on master image organizer 
// looking for best picture to replace space with 
    

var findBest = function (width, height) {
 var pixels = width * height;
 var huge = pixels > 1000000;
 var big = pixels >= 40000;
 var small = !big;
 var wide = (width / height) >= 2;
 var tall = (height / width) >= 2;
 
 if(huge)
     return (this.binarySearch(this.hugeArray,pixels));
    
 if(wide)
     return (this.binarySearch(this.wideArray,pixels));
 else if(tall)
     return (this.binarySearch(this.tallArray,pixels));
    
 if(big)
     return (this.binarySearch(this.bigArray,pixels));
 else
     return (this.binarySearch(this.smallArray,pixels));
  
}


var binarySearch = function (imageArray, pixels) {
    var min = 0;
    var max = imageArray.length;
    var length = max - min;
    var closestObj = {};
    var closestDist = Infinity;
    var bigger = pixels > (imageArray[0].width * imageArray[0].height);
    console.log("bigger: "+bigger);
    var pixels2 = imageArray[1].width * imageArray[1].height;
    console.log("pixels2: "+pixels2);
    var count = 1;
    if (bigger){
       while(pixels > pixels2){
            count++;
           pixels2 = imageArray[count].width * imageArray[count].length; 
       }
        return imageArray[count-1];
    }
    return imageArray[0];
}


    // hugeArray >= Images with 1000,000 pixels
    // bigArray >= 40,000 pixels
    // wideArray : width / height >= 2
    // tallArray : height / width >= 2
    // smallArray : !big
     
    
