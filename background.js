
 // Initialize data count
 let totalBytes = 0;

 //Set Values for CO2 Calculations
 const KWG_PER_GB = 1.805;
 const B_PER_GB = 1073741824;
//  const RETURNING_VISITOR_PERCENTAGE = 0.75;
//  const FIRST_TIME_VIEWING_PERCENTAGE = 0.25;
//  const PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
 const CARBON_PER_KWG_GRID = 475;
 const CARBON_PER_KWG_RENEWABLE = 33.4;
 const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
 const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = 0.8992;
 const CO2_GRAMS_TO_LITRES = 0.5562;

 // take the totalBytes value and calculate the CO2 emmisions
 function calculateCarbon(totalBytes){
  // first, calculate energy intensity of web data
  const energy = totalBytes * (KWG_PER_GB/B_PER_GB)
  // carbon intensity of electricity used
  const totalCarbon = energy * CARBON_PER_KWG_GRID

  //save carbon value on the storage API

  chrome.storage.sync.set({'carbonOutput': totalCarbon}, function(){
    console.log('value is set to', totalCarbon)
  });
}


 // calculate some of all web request data
function sumBytes(bytes){
  totalBytes += bytes;
  calculateCarbon(totalBytes);
}

//listens to every http request and finds the content-length property of each
 chrome.webRequest.onHeadersReceived.addListener(function(details){

      if(details.responseHeaders){
      const headers = details.responseHeaders;
      const contentlengthObj = headers.filter(header => header.name === 'content-length')
      const contentBytes = contentlengthObj[0].value
      const bytes = Number(contentBytes)
          sumBytes(bytes);
      }
    },
    {
      urls: ["<all_urls>"] ,
      types: ["xmlhttprequest"]
    },["responseHeaders"])






