// ==UserScript==
// @name        fbSuggestsDisable
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @include     https://www.facebook.com/
// @run-at document-end
// @version     v1.2
// ==/UserScript==

new MutationObserver(function(mutat) {
	let feedsLocation=document.querySelector('div[role="feed"]');
	if(feedsLocation){
		this.disconnect();
		console.log("suggestions disabler on....");
		new MutationObserver((mutations)=>
		    mutations.forEach((mutation)=> mutation.addedNodes.length>0 && mutation.addedNodes[0].attributes?.getNamedItem("data-pagelet")
			    && document.evaluate("./div/div/div/div/div/div/div/div/div/div/div/div/div/div/div//span[starts-with(text(),'Sugge')]", mutation.addedNodes[0], null, XPathResult.ANY_TYPE).iterateNext() 
			    && (mutation.addedNodes[0].style.display='none') 
			    && console.log("suggest removed"))
		).observe(feedsLocation, { childList: true });        
    	} 
}).observe(document, {subtree: true,
                      childList: true});
