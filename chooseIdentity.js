
let runnersIdentities = cards.filter(function(el) {
  if (el["type_code"] == "identity" && el["side_code"] == "runner") {
    return true
  }
})
let corpIdentities = cards.filter(function(el) {
  if (el["type_code"] == "identity" && el["side_code"] == "corp") {
    return true
  }
})
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
    let element = document.getElementById('identities');
    element.appendChild(option);
  }
  document.getElementById('identities').addEventListener('change', changePerson);
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