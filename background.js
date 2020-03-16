
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
  // first, calculate energy intensity (in KwH) of web data
  const energy = totalBytes * (KWG_PER_GB/B_PER_GB)
  calculateCoffee(energy)
  calculateCar(energy)
  calculateLight(energy)

  // carbon intensity of electricity used
  const totalCarbon = energy * CARBON_PER_KWG_GRID

  //save carbon value on the storage API
  calculateTree(totalCarbon)
  chrome.storage.sync.set({'carbonOutput': totalCarbon})
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

// function to calculate number of trees absorbing C02 per day
function calculateTree(carbon){
  const C_PER_TREE_DAY = 55;
  const numOfTrees = Math.round(carbon/C_PER_TREE_DAY)
  chrome.storage.sync.set({'trees': numOfTrees});
}

// function to show the number of hours a lightbulb would be alight for with this amount of energy
function calculateLight(energy){
  const NRG_LIGHT_HR = 0.06;
  const numOfHours = Math.round(energy/NRG_LIGHT_HR)
  chrome.storage.sync.set({'hours': numOfHours});
}

// function to show the number of miles an electric car would travel with this amount of energy
function calculateCar(energy){
  const KWH_PER_MILE = 3;
  const numOfMiles = Math.round(energy/KWH_PER_MILE)
  chrome.storage.sync.set({'miles': numOfMiles});
}

// function to show the number of coffees that could be made with this amount of energy
function calculateCoffee(energy){
  const NRG_PER_COFFEE = 0.0156 ;
  const numOfCoffees = Math.round(energy/NRG_PER_COFFEE)
  chrome.storage.sync.set({'coffee': numOfCoffees});
}
