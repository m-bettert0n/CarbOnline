let carbon = document.getElementById('carbon');

chrome.storage.sync.get('carbonOutput', function(data) {
  let num = data.carbonOutput.toFixed(2);
  carbon.innerHTML = `${num} g`
});


