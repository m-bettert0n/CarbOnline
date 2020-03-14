/* in the background.js set up th event based logic
on installation of the extension
on specific listeners
webRequest API to listen for specific http requests?
filters events to listen for
*/
chrome.runtime.onInstalled.addListener(function() { //onInstalled function. Use to initialize data maybe ?
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    chrome.history.search({
      text: '',
      maxResults: 0
    }, function(historyItems){
      if(historyItems.length === 0){
        return 'no history'
      }
      else{
        const oldestItem =  historyItems[historyItems.length-1]
        console.log(historyItems.length)
        return true
      }
    });
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
