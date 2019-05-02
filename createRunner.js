
function buildRunnerDeck(deck) { // pass in (faction)Pool
  if (deck == undefined) { 
    console.log(`no faction chosen`) 
    let rand = Math.floor(Math.random() * randRunFaction.length)
    deck = randRunFaction[rand]
  }
  var content = document.querySelectorAll('.card')
  for (let i = 0; i < content.length; i++) {
    content[i].innerHTML = "";
  }
  let currentFaction = deck[0]['faction_code']
  let playerHand = []
  
  if (currentIdentity == null) {
    currentIdentity = chooseIdentity('runner', currentFaction)
  }
  playerHand.push(currentIdentity)
  playerHand.push(chooseIcebreakers(deck, playerHand.length))
  playerHand.push(chooseHardware(deck))
  playerHand =  playerHand.flat()
  playerHand.push(chooseEvents(deck))
  playerHand =  playerHand.flat()
  playerHand.push(chooseResources(deck, playerHand.length))
  playerHand =  playerHand.flat()

  console.log(playerHand)

  return playerHand.flat().sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        })
}

function chooseIcebreakers(deck) { 
let playerHandIcebreakers = []
let codeCount = 0
let sentryCount = 0
let barrierCount = 0
let icees = filterByIcebreakers()
  // debugger
while (playerHandIcebreakers.length < 15) {
  let index = Math.floor(Math.random() * icees.length)
  let thisCard = icees[index]
  const maxCards = 5
  // debugger
  if (thisCard["text"].includes("code gate")) {
    if (codeCount < maxCards) {
      playerHandIcebreakers.push(icees.splice(index, 1))
      codeCount++
    }
  } else if (thisCard["text"].includes("sentry")) {
    if (sentryCount < maxCards) {
      playerHandIcebreakers.push(icees.splice(index, 1))
      sentryCount++
    }
  } else if (thisCard["text"].includes("barrier")) {
    if (barrierCount < maxCards) {
      playerHandIcebreakers.push(icees.splice(index, 1))
      barrierCount++
    }
  } else {
    playerHandIcebreakers.push(icees.splice(index, 1))
  }

}
return playerHandIcebreakers.flat()
}

function chooseHardware(deck) {
  console.log(`choose hardware`)
let playerHandHardware = []
let hardware = filterByHardware()
for (let i = 0; i < 6; i++) {
  var index = [Math.floor(Math.random() * hardware.length)]
  let thisCard = hardware.splice(index, 1)
  playerHandHardware.push(thisCard)
}
return playerHandHardware.flat()
}

function chooseEvents(deck, length) {
let playerHandEvents = []
let events = filterByEvents()
while (playerHandEvents.length < 12) {
  var index = [Math.floor(Math.random() * events.length)]
  let thisCard = events.splice(index, 1)
  playerHandEvents.push(thisCard)
}
return playerHandEvents.flat()
}

function chooseResources(deck, length) {
// console.log(`chooseResources function called`)

let playerHandResources = []
let resources = filterByResources()
while (playerHandResources.length < 12) {
  var index = [Math.floor(Math.random() * resources.length)]
  let thisCard = resources.splice(index, 1)
  playerHandResources.push(thisCard)
}
return playerHandResources.flat()
}
