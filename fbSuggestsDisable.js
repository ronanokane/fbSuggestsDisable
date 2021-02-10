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
 
  let countFeeds=document.evaluate("count(/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div[4]/div/div[@data-pagelet='FeedUnit_{n}'])",document, null, XPathResult.NUMBER_TYPE, null).numberValue;
 
  window.addEventListener('scroll', () => {
     const {
         scrollTop,
         scrollHeight,
         clientHeight
     } = document.documentElement;
    
     if (scrollTop + clientHeight >= scrollHeight - 5){
       let x=setInterval(()=>{
         let nowCountFeeds=document.evaluate("count(/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div[4]/div/div[@data-pagelet='FeedUnit_{n}'])",document, null, XPathResult.NUMBER_TYPE, null).numberValue;

         // new news feeds
         if(nowCountFeeds>countFeeds){
           countFeeds=nowCountFeeds;
           removeSuggests (); clearInterval(x);
         }
       }, 500);

       // get us out if no new news items
       setTimeout(()=>{clearInterval(x);},8000);
     }
  });
});


function removeSuggests()
{
 let results = document.evaluate("/html/body/div[1]/div/div[1]/div[1]/div[3]/div/div/div[1]/div[1]/div/div[2]/div/div/div[3]/div/div[4]/div/div[@data-pagelet='FeedUnit_{n}']//span[contains(text(),'Suggested for you')]/../../../../../../../../../../../../../../../../.." ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

 for (let i = 0; i < results.snapshotLength; i++) {
   if(results.snapshotItem(i).style.display!='none'){
     results.snapshotItem(i).style.display='none';
     console.log("removed a suggest..");
   }
 }
}