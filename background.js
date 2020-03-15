/* in the background.js set up th event based logic
on installation of the extension
on specific listeners
webRequest API to listen for specific http requests?
filters events to listen for
*/
 //onInstalled function. Use to initialize data maybe ?

 chrome.webRequest.onHeadersReceived.addListener(function(details){
   const headers = details.responseHeaders;
   const contentlength = headers.filter(header => header.name === 'content-length')
      console.log(contentlength[0].value);
    },
    {
      urls: ["<all_urls>"] ,
      types: ["xmlhttprequest"]
    },["responseHeaders"])
