let data = eachCard.data
// let data = cardsService.getAll();
let currentIdentity
let currentFaction

function ownedPacks(item) {
  if (item["pack_code"] === "core" ||
  item["pack_code"] === "om" ||
  item["pack_code"] === "st" ||
  item["pack_code"] === "mt" ||
  item["pack_code"] === "up" ||
  item["pack_code"] === "tbs" ||
  item["pack_code"] === "fc" ||
  item["pack_code"] === "uao" ||
  item["pack_code"] === "val" ||
  item["pack_code"] === "cc" ||
  item["pack_code"] === "uw" ||
  item["pack_code"] === "oh" ||
  item["pack_code"] === "uot" ||
  item["pack_code"] === "kg" ||
  item["pack_code"] === "bf" ||
  // item["pack_code"] === "dag" ||
  item["pack_code"] === "si" ||
  item["pack_code"] === "tlm" ||
  item["pack_code"] === "ftm" ||
  item["pack_code"] === "23s" ||
  // item["pack_code"] === "ml" ||
  // item["pack_code"] === "qu" ||
  item["pack_code"] === "baw" ||
  // item["pack_code"] === "fm" ||
  item["pack_code"] === "td" ||
  item["pack_code"] === "asis" ||
  item["pack_code"] === "core2" ||
  item["pack_code"] === "rar" ||
  item["pack_code"] === "df" ||
  item["pack_code"] === "val" ) {
    return true
  }
  // just opened democracy and dogma
}

const cards = data.filter(ownedPacks)
// let div = document.getElementById('random-card')
let jintekiPool = putAllCardsInDeck(createFactionDeck('corp', 'jinteki')) 
let hbPool = putAllCardsInDeck(createFactionDeck('corp', 'haas-bioroid')) 
let nbnPool = putAllCardsInDeck(createFactionDeck('corp', 'nbn')) 
let weylandPool = putAllCardsInDeck(createFactionDeck('corp', 'weyland-consortium'))
let randCorpFaction = [jintekiPool, hbPool, nbnPool, weylandPool]

let anarchPool = putAllCardsInDeck(createFactionDeck('runner', 'anarch'))
let criminalPool = putAllCardsInDeck(createFactionDeck('runner', 'criminal'))
let shaperPool = putAllCardsInDeck(createFactionDeck('runner', 'shaper'))
let randRunFaction = [anarchPool, criminalPool, shaperPool]

fetch('https://netrunnerdb.com/api/2.0/public/cards')
.then(function(response) {
  return response.json()
})
.then(function(x) {
  let rand = Math.floor(Math.random() * x.data.length)
  let card = x.data[rand]
  var cardImage = (card.hasOwnProperty('image_url')) ? `<img src=${card['image_url']} alt="">` : `<img src=https://netrunnerdb.com/find/?q=${card['title'].split(' ').join('+').toLowerCase()}>`
  console.log(cardImage)
  document.getElementById('random-card').innerHTML = `${cardImage}`
})

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
  var type = deck[1]["type"]
  var image = deck[1]["array"][0][0]["image_url"]
  var content = document.getElementById('identity-content')
  var ident = deck[0]
  var card =   ident.hasOwnProperty('image_url') ?  `<img src="${deck[0]['image_url']}" alt="">` : `<img src="https://netrunnerdb.com/card_image/${ident['code']}.png" alt="">` 
  content.innerHTML = content.innerHTML + `<li class='card'>${card}</li>`
    var classes = content.classList;
    classes.remove('hide');
    document.getElementById('random-card').classList.add('hide')

  for (var i = 1; i < deck.length; i++) {
    console.log(deck[i])
    deck[i]['array'][0].sort(function(a, b) {
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    })
  // each 'i' is an array of the types, including type name, length, and array of cards
    for (var x = 1; x < deck[i].length; x++) {
      var type = deck[i]['type']
      var content = document.getElementById(`${type}-content`)
      content.classList.remove('hide')

      // var card = if card is agenda, display title, cost and points, if not, 
        // if card is ice, display title, cost and strength, if not,
        // if card is neutral, add classList


      // `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'>(${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :

      content.innerHTML = content.innerHTML + `<li>${deck[i]['array'][0][x].title}</li>`
    }
    var typeCountContainer = document.getElementById(`${type}-count`)
    console.log(`typeCountContainer`, typeCountContainer )
    typeCountContainer.innerText = deck[i].length
  }

    if (document.getElementById('agenda-content').children.length > 1) {
    document.getElementById('agenda-content').children[0].innerText = `Agendas`
  }
  
  if (document.getElementById('asset-content').children.length > 1) {
    document.getElementById('asset-content').children[0].innerText = 'Assets'
  }

  if (document.getElementById('operation-content').children.length > 1) {
    document.getElementById('operation-content').children[0].innerText = 'Operations'
  }
  
  if (document.getElementById('upgrade-content').children.length > 1) {
    document.getElementById('upgrade-content').children[0].innerText = 'Upgrades'
  }
  document.querySelector('#corp-identity-chooser').classList.add('hide')
  document.querySelector('#runner-identity-chooser').classList.add('hide')
  document.querySelector('#choose-identity-container').classList.add('hide')
}

// function displayCorpDeck(deck) { 
//   // console.log(`deck`, deck)
//   let count = groupBy(deck, 'type_code')
//   // console.log(`count`, count)
//   let titleDeck = groupBy(deck, 'title')
//   let titles = Object.keys(titleDeck)

//   titles.forEach(function(item) {
//     var content = document.getElementById(`${titleDeck[item][0]["type_code"]}-content`)
//     var elementId = `${titleDeck[item][0]["type_code"]}-count`
//     var typeCountElement = document.getElementById(elementId)
//     var type = `${titleDeck[item][0]["type_code"]}`
//     var typeCountContent = `${titleDeck[item][0]["type_code"]}-count`
//     debugger
//     typeCountElement.innerText = 'test'

//     var card = (titleDeck[item][0]['type_code'] == 'identity') &&  (titleDeck[item][0].hasOwnProperty('image_url')) ? 
//     `<img src=${titleDeck[item][0]['image_url']} alt="">` : 
//     (titleDeck[item][0]['type_code'] == 'identity') ? 
//     `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : 
//     (titleDeck[item][0]['type_code'] == 'ice') ? 
//     `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'>(${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :
//     (titleDeck[item][0]['type_code'] == 'agenda') ? 
//     `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]} </a> <span class='subtext'>(${titleDeck[item][0]["advancement_cost"]} / ${titleDeck[item][0]["agenda_points"]})</span>` : 
//     `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`
//     // cost/points/strength
//     var classes = content.classList;
//     classes.remove('hide');
//     if(titleDeck[item][0]['faction_code'] == 'neutral-corp') {
//       content.innerHTML = content.innerHTML + `<li class='card neutral'>${card}</li>`
//     } else {
//       content.innerHTML = content.innerHTML + `<li class='card'>${card}</li>`
//     }
//   })

//   if (document.getElementById('agenda-content').children.length > 1) {
//     document.getElementById('agenda-content').children[0].innerText = 'Agendas'
//   }
  
//   if (document.getElementById('asset-content').children.length > 1) {
//     document.getElementById('asset-content').children[0].innerText = 'Assets'
//   }

//   if (document.getElementById('operation-content').children.length > 1) {
//     document.getElementById('operation-content').children[0].innerText = 'Operations'
//   }
  
//   if (document.getElementById('upgrade-content').children.length > 1) {
//     document.getElementById('upgrade-content').children[0].innerText = 'Upgrades'
//   }
//   document.querySelector('#random-card').classList.add('hide')
//   document.querySelector('#corp-identity-chooser').classList.add('hide')
//   document.querySelector('#runner-identity-chooser').classList.add('hide')
//   document.querySelector('#choose-identity-container').classList.add('hide')
//   let showDeck = groupBy(deck, 'type_code')
//   return showDeck
// } 


function displayDeck(deck) { 
  let titleDeck = groupBy(deck, 'title')
  let titles = Object.keys(titleDeck)
  titles.forEach(function(item) {

    let content = document.getElementById(`${titleDeck[item][0]["type_code"]}-content`)
    let contentText = document.getElementById(`${titleDeck[item][0]["type_code"]}`)

    var card = (titleDeck[item][0]['type_code'] == 'identity') && (titleDeck[item][0].hasOwnProperty('image_url')) ? 
    `<img src=${titleDeck[item][0]['image_url']} alt="">` : 
    (titleDeck[item][0]['type_code'] == 'identity') ? 
    `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : 
    (titleDeck[item][0].hasOwnProperty('keywords')) && (titleDeck[item][0]['keywords'].includes('Icebreaker')) ? 
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'> (${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`
    var classes = content.classList;
    classes.remove('hide');
      if (titleDeck[item][0]['faction_code'] == 'neutral-runner') {
        content.innerHTML = content.innerHTML + `<li class='card neutral'>${card}</li>`
      } else {
        content.innerHTML = content.innerHTML + `<li class='card'>${card}</li>`
      }
  })

    if (document.getElementById('event-content').children.length > 1) {
      document.getElementById('event-content').children[0].innerText = 'Events'
    }

    if (document.getElementById('program-content').children.length > 1) {
      document.getElementById('program-content').children[0].innerText = 'Programs'
    }

    if (document.getElementById('resource-content').children.length > 1) {
      document.getElementById('resource-content').children[0].innerText = 'Resources'
    }
  document.querySelector('#random-card').classList.add('hide')
  document.querySelector('#corp-identity-chooser').classList.add('hide')
  document.querySelector('#runner-identity-chooser').classList.add('hide')
  document.querySelector('#choose-identity-container').classList.add('hide')
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
      } else {
        (nodeList[i].classList.add('hide'))
      }
        }
    });
}
