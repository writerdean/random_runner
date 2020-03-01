function filterByIdentity() {
  return cards.filter(function (el) {
      if (el["type_code"] == "identity") {
        return true;
      }
  });
}

function filterByAllIdentities() {
  return data.filter(function (el) {
      if (el["type_code"] == "identity") {
        return true;
      }
  });
}

function filterByAgenda() {
  return cards.filter(function (el) {
      return (el["type_code"] == "agenda");
  });
}

function filterByProgram() {
  return cards.filter(function (el) {
      return (el["type_code"] == "program");
  });
}

function filterByIcebreakers() {
  return cards.filter(function (el) {
    if (el.hasOwnProperty('keywords')) {
      return (el["type_code"] == "program");
    }
  });
}

function filterByAsset() {
  return cards.filter(function (el) {
      return (el["type_code"] == "asset");
  })
}

function filterByHardware() {
  return cards.filter(function (el) {
      return (el["type_code"] == "hardware");
  });
}

function filterByResources() {
  return cards.filter(function (el) {
      return (el["type_code"] == "resource") 
  });
}

function filterByEvents() {
  return cards.filter(function (el) {
      return (el["type_code"] == "event");
  });
}

function filterByOperation() {
  return cards.filter(function (el) {
      return (el["type_code"] == "operation");
  });
}

function filterByIce() {
  return cards.filter(function (el) {
      return (el["type_code"] == "ice");
  });
}

function filterByUpgrade() {
  return cards.filter(function (el) {
      return (el["type_code"] == "upgrade");
  });
}

function filterByFaction(faction) {  
  return cards.filter(function (el) {
    return (el["faction_code"] == faction);
  });
}

function filterByNeutral(side) {  
  return cards.filter(function (el) {
      return (el["faction_code"] == `neutral-${side}`);
  });
}

function filterBySide(query) {
  return cards.filter(function (el) {
      if (el["side_code"] == query) {
        return true;
      }
  });
}