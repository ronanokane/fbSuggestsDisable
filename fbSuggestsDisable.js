// ==UserScript==
// @name        fbSuggestsDisable
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @include     https://www.facebook.com/
// @run-at document-end
// @version     v1.2
// ==/UserScript==

  var timeElapsed=0, feedsLocation, x=setInterval(()=> {
    if((timeElapsed+=200)>=5000){
        clearInterval(x); 
        return;
    }
    if((feedsLocation=document.querySelector('div[role="feed"]'))){
        console.log("suggestions disabler on....");
      	clearInterval(x);
        
        var mutationObserver = new MutationObserver((mutations)=>
          mutations.forEach((mutation)=> mutation.addedNodes.length>0 && mutation.addedNodes[0].attributes?.getNamedItem("data-pagelet")
              && document.evaluate("./div/div/div/div/div/div/div/div/div/div/div/div/div/div/div//span[starts-with(text(),'Sugge')]", mutation.addedNodes[0], null, XPathResult.ANY_TYPE).iterateNext() 
              && (mutation.addedNodes[0].style.display='none') 
              && console.log("suggest removed"))
        );
        mutationObserver.observe(feedsLocation, {
          childList: true
        });        
    } 
  }, 200);        
