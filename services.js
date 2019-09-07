let eachCard;
fetch('https://netrunnerdb.com/api/2.0/public/cards')
.then(function(response) {
  return response.json()
})
.then(data => eachCard = data)

let packs;
fetch('https://netrunnerdb.com/api/2.0/public/packs')
.then(function(response) {
  return response.json()
})
.then(data => packs = data)

