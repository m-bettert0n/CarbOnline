let carbon = document.getElementById('carbon');
let trees = document.getElementById('trees');
let light = document.getElementById('light');
let car = document.getElementById('car');
let coffee = document.getElementById('coffee');

chrome.storage.sync.get('carbonOutput', function(data) {
  let num = data.carbonOutput.toFixed(2);
  if(num ===0) carbon.innerHTML = `0.00g`
  else carbon.innerHTML = `${num} g`
});


// button onClick produce Trees text
chrome.storage.sync.get('trees', function(data) {
  let num = data.trees;
  if(num ===0) trees.innerHTML = `Not enough`
  else trees.innerHTML = `${num} trees`
});

// button onClick produce lightbulb text
chrome.storage.sync.get('hours', function(data) {
  let num = data.hours;
  if(num ===0) light.innerHTML = `Not enough energy to power a lightbulb`
  else light.innerHTML = `${num} hours`
});

// button onClick produce electricCar text
chrome.storage.sync.get('miles', function(data) {
  let num = data.miles;
  if(num ===0) car.innerHTML = `Not enough energy to travel in an electric car`
  else car.innerHTML = `${num} miles`
});

// button onClick produce boiling water text
chrome.storage.sync.get('coffee', function(data) {
  let num = data.coffee;
  if(num ===0) coffee.innerHTML = `Not enough energy to make a cup of coffee`
  else coffee.innerHTML = `${num} cups of coffee`
});
