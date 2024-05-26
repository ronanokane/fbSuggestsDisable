// ==UserScript==
// @name        fbSuggestsDisable
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @match     https://www.facebook.com/
// @run-at document-end
// @version     v1.2
// ==/UserScript==

let feedsLocation=document.evaluate('//div[./h3/text()="News Feed posts"]/div[2]',document, null, XPathResult.ANY_TYPE).iterateNext();
if(!feedsLocation){
    alert('Html Structure changed... update fbSuggestsDisable');
    return;
}
console.log("suggestions disabler on....");

let wipe=node=>document.evaluate(".//span[starts-with(text(),'Suggested for you')]", node, null, XPathResult.ANY_TYPE).iterateNext()
    && (node.style.display='none')

// wipe initial suggestions
feedsLocation.childNodes.forEach(wipe)

// wipe dynamicaly added suggestions
new MutationObserver((mutations)=>mutations.forEach((mutation)=> mutation.addedNodes.length>0
    && wipe(mutation.addedNodes[0]))
).observe(feedsLocation, { childList: true });