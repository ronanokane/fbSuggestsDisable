// ==UserScript==
// @name        Facebook_suggestions_disabler
// @description	Remove the annoying facebook suggestions
// @author      Ronan O' Kane
// @include     https://www.facebook.com/
// @version     v1.0
// ==/UserScript==

window.addEventListener('load', (event) => {
  console.log("suggestions disabler on....");
  removeSuggests();
  
  let prevScrollHeight= document.documentElement.scrollHeight;
  
	setInterval(()=>{
    prevScrollHeight < document.documentElement.scrollHeight && (prevScrollHeight=document.documentElement.scrollHeight) && removeSuggests();
  }, 200);
});


function removeSuggests(){
 let results = document.evaluate("/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div[4]/div/div[@data-pagelet='FeedUnit_{n}']//span[starts-with(text(),'Sugge')]/../../../../../../../../../../../../../../../../.." ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

 for (let i = 0; i < results.snapshotLength; i++) {
   results.snapshotItem(i).style.display!=='none' && (results.snapshotItem(i).style.display='none');
 }
}