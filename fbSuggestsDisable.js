// ==UserScript==
// @name        Facebook_suggestions_disabler v1.2
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @include     https://www.facebook.com/
// @version     v1.2
// ==/UserScript==

window.addEventListener('load', (event) => {
  var timeElapsed=0, feedsLocation, x=setInterval(()=> {
    if((timeElapsed+=200)>=5000){
        clearInterval(x); 
        return;
    }
    if((feedsLocation=document.evaluate("/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div[4]/div" ,document, null, XPathResult.ANY, null ).iterateNext())){
        console.log("suggestions disabler on....");
      	clearInterval(x);
        
        var mutationObserver = new MutationObserver((mutations)=>
          mutations.forEach((mutation)=> mutation.addedNodes.length>0 && mutation.addedNodes[0].attributes?.getNamedItem("data-pagelet")
              && document.evaluate("./div/div/div/div/div/div/div/div/div/div/div[2]/div/div[1]/div/div//span[starts-with(text(),'Sugge')]", mutation.addedNodes[0], null, XPathResult.ANY_TYPE).iterateNext() 
              && (mutation.addedNodes[0].style.display='none') 
              && console.log("suggest removed"))
        );
        mutationObserver.observe(feedsLocation, {
          childList: true
        });        
    } 
  }, 200);        
});
