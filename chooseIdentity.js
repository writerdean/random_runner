
let runnersIdentities = cards
  .filter(function(el) {
  return (el["type_code"] == "identity" && el["side_code"] == "runner") 
})
.sort(function(a, b) {
  return a.title < b.title ? -1 : 1;
})
.sort(function(a, b) {
  return a.faction_code < b.faction_code ? -1 : 1;
});


let corpIdentities = cards
  .filter(function(el) {
  return (el["type_code"] == "identity" && el["side_code"] == "corp") 
})
.sort(function(a, b) {
  return a.title < b.title ? -1 : 1;
})
.sort(function(a, b) {
  return a.faction_code < b.faction_code ? -1 : 1;
});

let allIdentities = [...runnersIdentities, ...corpIdentities]

function chooseFromRunnerIdentityList() {
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
  for (let i = 0; i < runnersIdentities.length; i++) {
    let option = document.createElement('option');
    let node = document.createTextNode(corpIdentities[i]['title']);
    option.appendChild(node);
    let element = document.getElementById('corp-identity-dropdown');
    element.appendChild(option);
  }
  document.getElementById('corp-identity-dropdown').addEventListener('change', changePerson);
  }
function changePerson(event) {
  let currentChoice = document.getElementById('identities').value;
  currentIdentity = allIdentities.filter(function(el) {
        if (el["title"] == currentChoice) {
          return true
        }
    })[0]
  document.getElementById('identities').selectedIndex = null;
    return currentIdentity
  }