let currentIdentity;

const cards = eachCard["data"]
const runnersIdentities = cards.filter(function(el) {
  if (el["type_code"] == "identity" && el["side_code"] == "runner") {
    return true
  }
})

const corpIdentities = cards.filter(function(el) {
  if (el["type_code"] == "identity" && el["side_code"] == "corp") {
    return true
  }
})

function changePerson(event) {
  currentIdentity = document.getElementById('identities').value;
  console.log(`currentIdentity = ${currentIdentity}`)
  document.getElementById('identities').selectedIndex = null;
}

function chooseFromRunnerIdentityList() {
console.log('run Joe run run run')
  for (let i = 0; i < runnersIdentities.length; i++) {
    let option = document.createElement('option');
    let node = document.createTextNode(runnersIdentities[i]['title']);
    option.appendChild(node);
    let element = document.getElementById('identities');
    element.appendChild(option);
  }
  document.getElementById('identities').addEventListener('change', changePerson);
}

function chooseFromCorpIdentityList() {
  console.log('run Jen run')
  for (let i = 0; i < runnersIdentities.length; i++) {
    let option = document.createElement('option');
    let node = document.createTextNode(corpIdentities[i]['title']);
    option.appendChild(node);
    let element = document.getElementById('identities');
    element.appendChild(option);
  }
  document.getElementById('identities').addEventListener('change', changePerson);
  }

