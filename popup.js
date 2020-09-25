let carbon = document.getElementById('carbon');
let treeBtn = document.getElementById('treeBtn');
let lightBtn = document.getElementById('lightBtn');
let carBtn = document.getElementById('carBtn');
let coffeeBtn = document.getElementById('coffeeBtn');
let link = document.getElementById("website");

chrome.storage.local.get('carbonOutput', function(data) {
  let num = data.carbonOutput.toFixed(2);
  if(num ===0) carbon.innerHTML = `0.00g`
  else carbon.innerHTML = `${num} g`
});


// button onClick produce Trees text
  treeBtn.addEventListener("click", function(){
    let trees = document.createElement("h5");
    trees.id = "trees";
    treeBtn.insertBefore(trees, null)
    chrome.storage.local.get('trees', function(data) {
    let num = data.trees;
    if(num ===0 || num === undefined) trees.innerHTML = `Not enough carbon for a tree's daily intake`
    else if(num === 1) trees.innerHTML = `We've emitted the amount of carbon that a single tree absorbs in a day.`
    else{
      trees.innerHTML = `We've emitted the amount of carbon that ${num} trees absorb in a day.`
    }
  });
})

// button onClick produce lightbulb text
lightBtn.addEventListener("click", function(){
  let light = document.createElement("h5");
  light.id = "light";
  lightBtn.insertBefore(light, null)
  chrome.storage.local.get('hours', function(data) {
    let num = data.hours;
    if(num === 0 || num === undefined) light.innerHTML = `Not enough energy to power a lightbulb`
    else if(num === 1) light.innerHTML = `That's enough energy to power a lightbulb for an hour`
    else{
      light.innerHTML = `That's enough energy to power a lightbulb for ${num} hours`
    }
  });
})

// button onClick produce electricCar text
carBtn.addEventListener("click", function(){
  let car = document.createElement("h5");
  car.id = "car";
  carBtn.insertBefore(car, null)
  chrome.storage.local.get('miles', function(data) {
    let num = data.miles;
    if(num === 0 || num === undefined) car.innerHTML = `Not enough energy to travel in an electric car`
    else if (num === 1) car.innerHTML = `Enough energy to travel 1 mile in an electric car`
    else car.innerHTML = `Enough energy to travel ${num} miles in an electric car`
  });
})

// button onClick produce boiling water text
coffeeBtn.addEventListener("click", function(){
  let coffee = document.createElement("h5");
  coffee.id = "coffee";
  coffeeBtn.insertBefore(coffee, null)
  chrome.storage.local.get('coffee', function(data) {
    let num = data.coffee;
    if(num === 0 || num === undefined) coffee.innerHTML = `Not enough energy to make a cup of coffee`
    else if (num === 1) coffee.innerHTML = `Enough energy to boil water for a single cup of coffee`
    else coffee.innerHTML = `Energy to boil water for ${num} cups of coffee`
  });
})

// link to website from popup
link.onclick = function () {
  chrome.tabs.create({active: true, url: "https://carbonline.netlify.app/"});
};
