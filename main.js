let data = eachCard.data
let currentIdentity

function ownedPacks(item) {
  if (item["pack_code"] === "rar" || item["pack_code"] === "td" || item["pack_code"] === "tlm" || item["pack_code"] === "cc" || item["pack_code"] === "uw" || item["pack_code"] === "uot" || item["pack_code"] === "oh" || item["pack_code"] === "kg" || item["pack_code"] === "mt" || item["pack_code"] === "up" || item["pack_code"] === "tsb" || item["pack_code"] === "fc" || item["pack_code"] === "uao" || item["pack_code"] === "23s" || item["pack_code"] === "core2" || item["pack_code"] === "core" || item["pack_code"] === "bf" || item["pack_code"] === "baw" || item["pack_code"] === "si") {
    return true
  }
}
  
const cards = data.filter(ownedPacks)

let jintekiPool = putAllCardsInDeck(createFactionDeck('corp', 'jinteki')) 
let hbPool = putAllCardsInDeck(createFactionDeck('corp', 'haas-bioroid')) 
let nbnPool = putAllCardsInDeck(createFactionDeck('corp', 'nbn')) 
let weylandPool = putAllCardsInDeck(createFactionDeck('corp', 'weyland-consortium'))
let randCorpFaction = [jintekiPool, hbPool, nbnPool, weylandPool]

let anarchPool = putAllCardsInDeck(createFactionDeck('runner', 'anarch'))
let criminalPool = putAllCardsInDeck(createFactionDeck('runner', 'criminal'))
let shaperPool = putAllCardsInDeck(createFactionDeck('runner', 'shaper'))
let randRunFaction = [anarchPool, criminalPool, shaperPool]


function createFactionDeck(side, faction) {
    return filterByFaction(faction).concat(filterByNeutral(side))
}

function chooseIdentity(side, faction) {
    let identities = filterByIdentity()

    let chooseSide = side
    let chooseFaction = faction
    const index = Math.floor(Math.random() * identities.length);
    let ident = identities[index]

    if (faction === undefined) {
      if (ident['side_code'] == side) {
        return ident
      } 
    }
    if (ident['faction_code'] == faction) {
      return ident
    } 
    return chooseIdentity(chooseSide, chooseFaction)
}

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) { // acc = accumulator
    var key = obj[property]; // obj is an object of the entire card, property is type_code
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
}

function countAgendaPoints(deck) {
      let totalPoints = 0
      deck.forEach(function(item) {
        if (item["type_code"] == "agenda") {
          totalPoints = totalPoints + item["agenda_points"]
        }
      })
      console.log(deck)
        return totalPoints
}

function putAllCardsInDeck(deck) { // pass in createFactionDeck(side, faction) 
  var factionPool = []
    deck.filter(function(el) {
      for (var i = 1; i <= el["quantity"]; i++) {
        factionPool.push(el)
      } 
    })
  return factionPool
}


function displayCorpDeck(deck) { 
  let titleDeck = groupBy(deck, 'title')
  let titles = Object.keys(titleDeck)
  
  titles.forEach(function(item) {
    var content = document.getElementById(`${titleDeck[item][0]["type_code"]}-content`)
    var card = (titleDeck[item][0]['type_code'] == 'identity') && 
    (titleDeck[item][0].hasOwnProperty('image_url')) ? 
    `<img src=${titleDeck[item][0]['image_url']} alt="">` : 
    (titleDeck[item][0]['type_code'] == 'identity') ? 
    `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : 
    (titleDeck[item][0]['type_code'] == 'ice') ? 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'>(${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :
    (titleDeck[item][0]['type_code'] == 'agenda') ? 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]} </a> <span class='subtext'>(${titleDeck[item][0]["advancement_cost"]} / ${titleDeck[item][0]["agenda_points"]})</span>` : 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`
    // cost/points/strength
    var classes = content.classList;
    classes.remove('hide');
    content.innerHTML = content.innerHTML + `<li class='card'>${card}</li>`
  })
  let showDeck = groupBy(deck, 'type_code')
  return showDeck
} 


function displayDeck(deck) { 
  let titleDeck = groupBy(deck, 'title')
  let titles = Object.keys(titleDeck)
  
  titles.forEach(function(item) {
    var content = document.getElementById(`${titleDeck[item][0]["type_code"]}-content`)
    var card = (titleDeck[item][0]['type_code'] == 'identity') && (titleDeck[item][0].hasOwnProperty('image_url')) ? 
    `<img src=${titleDeck[item][0]['image_url']} alt="">` : 
    (titleDeck[item][0]['type_code'] == 'identity') ? 
    `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : 
    (titleDeck[item][0].hasOwnProperty('keywords')) && (titleDeck[item][0]['keywords'].includes('Icebreaker')) ? 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'> (${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :
    (titleDeck[item][0]['type_code'] == 'agenda') ? 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]} </a> <span class='subtext'>(${titleDeck[item][0]["advancement_cost"]} / ${titleDeck[item][0]["agenda_points"]})</span>` : 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`
    var classes = content.classList;
    classes.remove('hide');
    content.innerHTML = content.innerHTML + `<li class='card'>${card}</li>`
  })
  let showDeck = groupBy(deck, 'type_code')
  
  return showDeck
} 

window.onload=function(){
    
  document.querySelector(".button-wrapper").addEventListener("click", function(event){
    event.target.classList.add('clicked')
    const runner = document.querySelector('.runner-button-wrapper')
    const nodeList = Array.from(document.querySelectorAll('.submit'))
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].classList.contains('clicked')) {
        // console.log('blah')
        console.log('clicked')
      } else {
        (nodeList[i].classList.add('hide'))
      }
        }
    });

}
