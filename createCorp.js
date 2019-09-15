
function buildCorpDeck(deck) { // pass in (faction)Pool
  // console.log(`current identity`, currentIdentity)
  if (deck === undefined) { 
    let rand = Math.floor(Math.random() * randCorpFaction.length);
    deck = randCorpFaction[rand];
  }
  const content = document.querySelectorAll('.card');
  for (let i = 0; i < content.length; i++) {
    content[i].innerHTML = "";
  }
  let currentFaction = deck[0]['faction_code'];
  let playerHand = [];

  if (currentIdentity === null) {
    currentIdentity = chooseIdentity('corp', currentFaction);
  }
  console.log(`currentIdentity`, currentIdentity)
  let min = currentIdentity.minimum_deck_size;

  playerHand.push(currentIdentity);
  playerHand.push(chooseAgendas(deck));
  playerHand.push(chooseIce(deck));
  playerHand.push(chooseAssets(deck));
  playerHand.push(chooseUpgrades(deck));
  playerHand = playerHand.flat();
  playerHand.push(chooseOperations(deck, playerHand.length, min));
  playerHand =  playerHand.flat();

  return playerHand.flat().sort(function(a, b){
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  })
}

function chooseAgendas(deck) { 
  let agendaPoints = 0;
  let playerHandAgendas = [];
  let agendas = deck.filter(function(el) {
      return el['type_code'] == 'agenda';
    });
  while (agendaPoints < 20) {
    while (true) {
      let index = Math.floor(Math.random() * agendas.length);
      let testCard = agendas[index];
      if (playerHandAgendas.filter(x => x.title == testCard.title).length < testCard.deck_limit) {
        playerHandAgendas.push(agendas.splice(index, 1));
        agendaPoints = agendaPoints + testCard["agenda_points"];
        playerHandAgendas = playerHandAgendas.flat();
        break;
      }
    }
  }    
  playerHandAgendas = playerHandAgendas.flat()  
  let agendasPlus = {
    type: playerHandAgendas[0]['type_code'], length: playerHandAgendas.flat().length, points: agendaPoints, array: [playerHandAgendas]
  };
  return agendasPlus;
}

function chooseIce(deck) {
  let playerHandIce = [];
  let codeCount = 0;
  let sentryCount = 0;
  let barrierCount = 0;
  let icees = deck.filter(function(el) {
      return el['type_code'] == 'ice';
    });
  while (playerHandIce.length < 15) {
    while (true) {
      let index = Math.floor(Math.random() * icees.length);
      let testCard = icees[index];
      const maxCards = 5;
      if (playerHandIce.filter(x => x.title == testCard.title).length < testCard.deck_limit) {
        if (testCard['keywords'].includes('Code')) {
          if (codeCount < maxCards) {
            playerHandIce.push(icees.splice(index, 1));
            codeCount++;
          }
        } else if (testCard['keywords'].includes('Sentry')) {
          if (sentryCount < maxCards) {
            playerHandIce.push(icees.splice(index, 1));
            sentryCount++;
          }
        } else if (testCard['keywords'].includes('Barrier')) {
          if (barrierCount < maxCards) {
            playerHandIce.push(icees.splice(index, 1));
            barrierCount++;
          }
        } else {
          playerHandIce.push(icees.splice(index, 1));
        }
        playerHandIce = playerHandIce.flat();
        break;
      }
    }
  }
  let icePlus = {
    type: playerHandIce[0]['type_code'],
    length: playerHandIce.flat().length,
    array: [playerHandIce]
  };
  return icePlus;
}
  // return playerHandIce.flat();


function chooseAssets(deck) {
  let playerHandAssets = [];
  let assets = deck.filter(function(el) {
    return el['type_code'] == 'asset';
  }
)
  let padIndex = assets.findIndex(x => x.code === "01109");
  // debugger
  playerHandAssets.push(assets.splice(padIndex, 3));
  for (var i = 0; i <= 3; i ++) {
    while(true){
      let index = [Math.floor(Math.random() * assets.length)];
      let testCard = assets[index];
      if(playerHandAssets.filter(x => x.title == testCard.title).length < testCard.deck_limit) {
        playerHandAssets.push(assets.splice(index, 1));
        playerHandAssets = playerHandAssets.flat();
        break;
      }
    }

  }
  let assetsPlus = {
    type: playerHandAssets[0]['type_code'],
    length: playerHandAssets.flat().length,
    array: [playerHandAssets]
  };
  return assetsPlus;
}

function chooseUpgrades(deck) {
  let playerHandUpgrades = [];
  let upgrades = deck.filter(function(el) {
    return el['type_code'] == 'upgrade';
  })
  for (var i = 0; i <= 6; i ++) {
    while(true){
      var index = [Math.floor(Math.random() * upgrades.length)]
      let testCard = upgrades[index];
      if(playerHandUpgrades.filter(x => x.title == testCard.title).length < testCard.deck_limit) {
        playerHandUpgrades.push(upgrades.splice(index, 1));
        playerHandUpgrades = playerHandUpgrades.flat();
        break;
      }
    }
  }
  let upgradesPlus = {
    type: playerHandUpgrades[0]['type_code'],
    length: playerHandUpgrades.flat().length,
    array: [playerHandUpgrades]
  };
  return upgradesPlus;
}

function chooseOperations(deck, length, min) {
  let playerHandOperations = [];
  let operations = deck.filter(function(el) {
    return el['type_code'] == 'operation';
  })
  let hedgeIndex = operations.findIndex(x => x.code === "01110");
  playerHandOperations.push(operations.splice(hedgeIndex, 3));
  while (length+playerHandOperations.length < min) {
    while (true) {
      let index = [Math.floor(Math.random() * operations.length)];
      let testCard = operations[index];
      if (playerHandOperations.filter(x => x.title === testCard.title).length < testCard.deck_limit) {
        playerHandOperations.push(operations.splice(index, 1));
        playerHandOperations = playerHandOperations.flat();
        break;
      }
    }
  }
  let operationsPlus = {
    type: playerHandOperations[0]['type_code'],
    length: playerHandOperations.flat().length,
    array: [playerHandOperations]
  };
  return operationsPlus;
}
