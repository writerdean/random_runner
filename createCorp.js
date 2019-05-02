
function buildCorpDeck(deck) { // pass in (faction)Pool
  if (deck == undefined) { 
    console.log(`no faction chosen`) 
    let rand = Math.floor(Math.random() * randCorpFaction.length)
    deck = randCorpFaction[rand]
  }
  var content = document.querySelectorAll('.card')
  for (let i = 0; i < content.length; i++) {
    content[i].innerHTML = "";
  }
  let currentFaction = deck[0]['faction_code']
  let playerHand = []
  
  if (currentIdentity == null) {
    currentIdentity = chooseIdentity('corp', currentFaction)
  }
  playerHand.push(currentIdentity)
  playerHand.push(chooseAgendas(deck).array)
  playerHand.push(chooseIce(deck))
  playerHand.push(chooseAssets(deck))
  playerHand.push(chooseUpgrades(deck))
  playerHand = playerHand.flat()
  playerHand.push(chooseOperations(deck, playerHand.length))
  playerHand =  playerHand.flat()

  return playerHand.flat().sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
        })
}

function chooseAgendas(deck) { 
  let agendaPoints = 0
  let playerHandAgendas = []
  let agendas = deck.filter(function(el) {
      return el['type_code'] == 'agenda'
    })
  while (agendaPoints < 20) {
    let index = Math.floor(Math.random() * agendas.length)
    let thisCard = agendas[index]
    playerHandAgendas.push(agendas.splice(index, 1))
    agendaPoints = agendaPoints + thisCard["agenda_points"] 
  }    
  // console.log(agendaPoints) 
  playerHandAgendas = playerHandAgendas.flat()  
  let agendasPlus = {points: agendaPoints, array: [playerHandAgendas]} 
  return agendasPlus
}

function chooseIce(deck) { 
  let playerHandIce = []
  let codeCount = 0
  let sentryCount = 0
  let barrierCount = 0
  let icees = deck.filter(function(el) {
      return el['type_code'] == 'ice'
    })
    // debugger
  while (playerHandIce.length < 15) {
    let index = Math.floor(Math.random() * icees.length)
    // console.log(index)
    let thisCard = icees[index]
    const maxCards = 5
    // debugger
    if (thisCard['keywords'].includes('Code')) {
      if (codeCount < maxCards) {
        playerHandIce.push(icees.splice(index, 1))
        codeCount++
      }
    } else if (thisCard['keywords'].includes('Sentry')) {
      if (sentryCount < maxCards) {
        playerHandIce.push(icees.splice(index, 1))
        sentryCount++
      }
    } else if (thisCard['keywords'].includes('Barrier')) {
      if (barrierCount < maxCards) {
        playerHandIce.push(icees.splice(index, 1))
        barrierCount++
      }
    } else {
      playerHandIce.push(icees.splice(index, 1))
    }

  }
  return playerHandIce.flat()
}

function chooseAssets(deck) {
  console.log(`chooseAssets`)
  let playerHandAssets = []
  let assets = deck.filter(function(el) {
    return el['type_code'] == 'asset'
  })
  for (var i = 0; i <= 6; i ++) {
    var index = [Math.floor(Math.random() * assets.length)]
    let thisCard = assets.splice(index, 1)
    playerHandAssets.push(thisCard)
  }
  return playerHandAssets.flat()
}

function chooseUpgrades(deck) {
  console.log(`choose upgrades`)
  let playerHandUpgrades = []
  let upgrades = deck.filter(function(el) {
    return el['type_code'] == 'upgrade'
  })
  for (var i = 0; i <= 6; i ++) {
    var index = [Math.floor(Math.random() * upgrades.length)]
    let thisCard = upgrades.splice(index, 1)
    playerHandUpgrades.push(thisCard)
  }
  return playerHandUpgrades.flat()
}

function chooseOperations(deck, length) {
  let playerHandOperations = []
  let operations = deck.filter(function(el) {
    return el['type_code'] == 'operation'
  })
  while (length+playerHandOperations.length < 45) {
    var index = [Math.floor(Math.random() * operations.length)]
    let thisCard = operations.splice(index, 1)
    playerHandOperations.push(thisCard)
  }
  return playerHandOperations.flat()
}
