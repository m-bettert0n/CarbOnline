
function moveData(){
  let str = 'http'

  chrome.storage.local.get(function(result){
    for(let key in result){
      if(key.slice(0, 4) === str){
        let url = key
        let co2 = result[key]
        localStorage.setItem(url, co2)
      }
    }
  })
  console.log('completed adding to localStorage')
}

moveData();
