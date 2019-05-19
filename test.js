// [...].filter(x => x==2).length
// [...].filter(function(x){return x==2}).length
function checkLength() {
  let newArray = [
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2}
  ]
  let array = [
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
    {"name": "tracy", "age": 53, "limit": 2},
    {"name": "scott", "age": 53, "limit": 2},
    {"name": "aubree", "age": 4, "limit": 2},
    {"name": "ali", "age": 3, "limit": 2},
    {"name": "Joe", "age": 35, "limit": 2},
    {"name": "Jen", "age": 34, "limit": 2},
  ]

  while (newArray.length < 12) {
    while(true){
      var index = [Math.floor(Math.random() * array.length)]
      let testCard = array[index]
      if(newArray.filter(x => x.name == testCard.name).length < testCard.limit)
      {
        newArray.push(array.splice(index, 1))
        newArray = newArray.flat() // before you flatten it, you are pushing an object inside of an array into newArray, and when you're checking x.name, it doesn't see it because it's just looking inside the array, not at the object inside of the array
        break;
      }
    }
  }
  return newArray.flat()
}

// console.log(checkLength())