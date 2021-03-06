const data = eachCard.data;
let currentIdentity;
let currentFaction;

function ownedPacks(item) {
  if (item["pack_code"] === "core" 
  || item["pack_code"] === "om" 
  || item["pack_code"] === "st" 
  || item["pack_code"] === "mt" 
  || item["pack_code"] === "ce" 
  || item["pack_code"] === "up" 
  || item["pack_code"] === "tbs" 
  || item["pack_code"] === "fc" 
  || item["pack_code"] === "uao" 
  || item["pack_code"] === "val" 
  || item["pack_code"] === "cc" 
  || item["pack_code"] === "uw" 
  || item["pack_code"] === "oh" 
  || item["pack_code"] === "uot" 
  || item["pack_code"] === "kg" 
  || item["pack_code"] === "bf" 
  || item["pack_code"] === "si" 
  || item["pack_code"] === "tlm" 
  || item["pack_code"] === "ftm" 
  || item["pack_code"] === "23s" 
  || item["pack_code"] === "baw" 
  || item["pack_code"] === "fm" 
  || item["pack_code"] === "td" 
  || item["pack_code"] === "asis" 
  || item["pack_code"] === "core2" 
  || item["pack_code"] === "rar" 
  || item["pack_code"] === "df" 
  || item["pack_code"] === "val" ) {
    return true;
  }
  // just opened democracy and dogma
}

const cards = data.filter(ownedPacks);
const div = document.getElementById('random-card');
const jintekiPool = putAllCardsInDeck(createFactionDeck('corp', 'jinteki'));
const hbPool = putAllCardsInDeck(createFactionDeck('corp', 'haas-bioroid'));
const nbnPool = putAllCardsInDeck(createFactionDeck('corp', 'nbn'));
const weylandPool = putAllCardsInDeck(createFactionDeck('corp', 'weyland-consortium'));
const randCorpFaction = [jintekiPool, hbPool, nbnPool, weylandPool];

const anarchPool = putAllCardsInDeck(createFactionDeck('runner', 'anarch'));
const criminalPool = putAllCardsInDeck(createFactionDeck('runner', 'criminal'));
const shaperPool = putAllCardsInDeck(createFactionDeck('runner', 'shaper'));
const randRunFaction = [anarchPool, criminalPool, shaperPool];

function getRandomCard() {
  const rand = Math.floor(Math.random() * data.length);
  const card = data[rand];
  const cardImage = (card.hasOwnProperty('image_url')) ? `<img src=${card['image_url']} alt="">` : null;
  if (cardImage != null) {
    document.getElementById('random-card').innerHTML = `${cardImage}`;
  }
}

function createFactionDeck(side, faction) {
  return filterByFaction(faction).concat(filterByNeutral(side));
}
function chooseIdentity(side, faction) {
  const identities = filterByIdentity();
  const chooseSide = side;
  const chooseFaction = faction;
  const index = Math.floor(Math.random() * identities.length);
  const ident = identities[index];

  if (faction === undefined) {
    if (ident['side_code'] === side) {
      return ident;
    }
  }
  if (ident['faction_code'] === faction) {
    return ident;
  }
  return chooseIdentity(chooseSide, chooseFaction);
}

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => { // acc = accumulator
    const key = obj[property]; // obj is an object of the entire card, property is type_code
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function countAgendaPoints(deck) {
  let totalPoints = 0;
  deck.forEach((item) => {
    if (item["type_code"] ==='agenda') {
      totalPoints += item['agenda_points'];
    }
  });
  return totalPoints;
}

function putAllCardsInDeck(deck) { // pass in createFactionDeck(side, faction) 
  let factionPool = [];
  deck.filter((el) => {
    for (let i = 1; i <= el['quantity']; i++) {
      factionPool.push(el);
    }
  });
  return factionPool;
}

function displayCorpDeck(deck) {
  // console.log('currentIdentity', currentIdentity);
  const content = document.getElementById('identity-content');
  const card = (deck[0]['type_code'] === 'identity') && (deck[0].hasOwnProperty('image_url')) ? `<img src=${deck[0]['image_url']} alt="">` : (deck[0]['type_code'] === 'identity') ? `<img src="https://netrunnerdb.com/card_image/${deck[0]['code']}.png" alt="">` : null;
  const classes = content.classList;
  classes.remove('hide');
  content.innerHTML += `<li class='card'>${card}</li>`;
  // debugger;
  for (let i = 1; i < deck.length; i++) {
    // console.log(deck[i]['array'][0]);
    let titleDeck = groupBy(deck[i]['array'][0], 'title');
    let titles = Object.keys(titleDeck);
    titles.forEach((item) => {
      // console.log(`${titleDeck[item][0]["type_code"]}-content`, item);
      const content = document.getElementById(`${titleDeck[item][0]["type_code"]}-content`)
      const card = (titleDeck[item][0]['type_code'] === 'identity') && (titleDeck[item][0].hasOwnProperty('image_url')) ? `<img src=${titleDeck[item][0]['image_url']} alt="">` : (titleDeck[item][0]['type_code'] === 'identity') ? `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : (titleDeck[item][0]['type_code'] === 'ice') ? `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'>(${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` : (titleDeck[item][0]['type_code'] === 'agenda') ? `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]} </a> <span class='subtext'>(${titleDeck[item][0]["advancement_cost"]} / ${titleDeck[item][0]["agenda_points"]})</span>` : `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`;
      // cost/points/strength
      const classes = content.classList;
      classes.remove('hide');
      if (titleDeck[item][0]['faction_code'] === 'neutral-corp') {
        content.innerHTML += `<li class='card neutral'>${card}</li>`;
      } else {
        content.innerHTML += `<li class='card'>${card}</li>`;
      }
    });
  }

  if (document.getElementById('agenda-content').children.length > 1) {
    document.getElementById('agenda-content').children[0].innerText = 'Agendas';
  }

  if (document.getElementById('asset-content').children.length > 1) {
    document.getElementById('asset-content').children[0].innerText = 'Assets';
  }

  if (document.getElementById('operation-content').children.length > 1) {
    document.getElementById('operation-content').children[0].innerText = 'Operations';
  }
  
  if (document.getElementById('upgrade-content').children.length > 1) {
    document.getElementById('upgrade-content').children[0].innerText = 'Upgrades';
  }
  document.querySelector('#random-card').classList.add('hide');
  document.querySelector('#corp-identity-chooser').classList.add('hide');
  document.querySelector('#runner-identity-chooser').classList.add('hide');
  document.querySelector('#choose-identity-container').classList.add('hide');

  const showDeck = groupBy(deck, 'type_code');
  return showDeck;
}


function displayDeck(deck) {
  const titleDeck = groupBy(deck, 'title');
  const titles = Object.keys(titleDeck);
  titles.forEach((item) => {
    const content = document.getElementById(`${titleDeck[item][0]['type_code']}-content`);
    // let contentText = document.getElementById(`${titleDeck[item][0]["type_code"]}`);
    const card = (titleDeck[item][0]['type_code'] == 'identity') && (titleDeck[item][0].hasOwnProperty('image_url')) ?
    `<img src=${titleDeck[item][0]['image_url']} alt="">` : 
    (titleDeck[item][0]['type_code'] == 'identity') ? 
    `<img src="https://netrunnerdb.com/card_image/${titleDeck[item][0]['code']}.png" alt="">` : 
    (titleDeck[item][0].hasOwnProperty('keywords')) && (titleDeck[item][0]['keywords'].includes('Icebreaker')) ?
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a> <span class='subtext'> (${titleDeck[item][0]["keywords"]}) (${titleDeck[item][0]["cost"]} / ${titleDeck[item][0]["strength"]})</span>` :
    `${titleDeck[item].length}x <a href=https://netrunnerdb.com/find/?q=${item.split(' ').join('+').toLowerCase()} target='_blank'> ${titleDeck[item][0]["title"]}</a>`
    const classes = content.classList;
    classes.remove('hide');
    if (titleDeck[item][0]['faction_code'] === 'neutral-runner') {
      content.innerHTML += `<li class='card neutral'>${card}</li>`;
    } else {
      content.innerHTML += `<li class='card'>${card}</li>`;
    }
  })
  if (document.getElementById('event-content').children.length > 1) {
    document.getElementById('event-content').children[0].innerText = 'Events';
  }
  if (document.getElementById('program-content').children.length > 1) {
    document.getElementById('program-content').children[0].innerText = 'Programs';
  }
  if (document.getElementById('resource-content').children.length > 1) {
    document.getElementById('resource-content').children[0].innerText = 'Resources';
  }
  document.querySelector('#random-card').classList.add('hide');
  document.querySelector('#corp-identity-chooser').classList.add('hide');
  document.querySelector('#runner-identity-chooser').classList.add('hide');
  document.querySelector('#choose-identity-container').classList.add('hide');
  const showDeck = groupBy(deck, 'type_code');
  return showDeck;
}

window.onload = () => {
  document.querySelector(".button-wrapper").addEventListener('click', (event) => {
    event.target.classList.add('clicked');
    // const runner = document.querySelector('.runner-button-wrapper');
    const nodeList = Array.from(document.querySelectorAll('.submit'));
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].classList.contains('clicked')) {
      } else {
        (nodeList[i].classList.add('hide'));
      }
    }
  });
}
