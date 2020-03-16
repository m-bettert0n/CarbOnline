let carbon = document.getElementById('carbon');

chrome.storage.sync.get('carbonOutput', function(data) {
  let num = data.carbonOutput.toFixed(2);
  if(num ===0) carbon.innerHTML = `0.00g`
  else carbon.innerHTML = `${num} g`
});


