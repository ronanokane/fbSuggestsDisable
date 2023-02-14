// ==UserScript==
// @name        fbSuggestsDisable
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @match     https://www.facebook.com/
// @run-at document-end
// @version     v1.2
// ==/UserScript==

let feedsLocation=document.evaluate('//div[./h3/text()="News Feed posts"]/div[1]',document, null, XPathResult.ANY_TYPE).iterateNext();
if(!feedsLocation){
    alert('Html Structure changed... update fbSuggestsDisable');
    return;
}
console.log("suggestions disabler on....");

new MutationObserver((mutations)=>mutations.forEach((mutation)=> mutation.addedNodes.length>0
    && document.evaluate(".//span[starts-with(text(),'Suggested')]", mutation.addedNodes[0], null, XPathResult.ANY_TYPE).iterateNext()
    && (mutation.addedNodes[0].style.display='none')
    && console.log("suggest removed"))
).observe(feedsLocation, { childList: true });
