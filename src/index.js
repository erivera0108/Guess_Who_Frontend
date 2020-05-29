document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")
  const peopleURL = 'http://localhost:3000/api/v1/people'
  const playerURL = 'http://localhost:3000/api/v1/players'
  const backButton = document.createElement('button')
  backButton.innerHTML = `<a href="">Back</a>`
  const welcomeDiv = document.querySelector('#welcome-message')
  const winBtn = document.createElement('button')
  winBtn.id = 'win-btn'
  winBtn.innerText = 'WINNER'
  const leaderBoard = document.createElement('div')

  const loseBtn = document.createElement('button')
  loseBtn.id = 'lose-btn'
  loseBtn.innerText = 'LOSER'


  const delPersonForm = document.createElement('form')
  delPersonForm.id = "del-player-form"
  delPersonForm.innerHTML = `<label for="name">Person's:</label>
  <input  type="text" id="del-name" name="name"><br>
  <input id= "submit-button" type="submit" value="Delete"></input>`
  

  const newPlayerForm = document.createElement('form')
  newPlayerForm.id = "new-player-form"
  newPlayerForm.innerHTML = `<label for="name">Your name:</label>
  <input  type="text" id="name" name="name"><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`


  const newPersonForm = document.createElement('form')
  newPersonForm.id = "new-person-form"
  newPersonForm.innerHTML = `<label for="name">Person's name:</label>
  <input  type="text" id="char-name" name="name"><br>
  <label for="name">Person's Pic</label>
  <input  type="text" id="char-pic" name="pic"><br>
  <input id= "char-submit-button" type="submit" value="Submit"></input>`

  const globalVar = {delDiv : null}
  


  

  document.addEventListener("submit", function(e){
    e.preventDefault()
    if(e.target === newPlayerForm){

    fetch(playerURL,{
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accept":"application/json"},
      body: JSON.stringify({
        name: newPlayerForm.name.value,
        wins: 0,
        losses: 0
      })
    })
    .then(res => res.json())
    .then(renderPlayer)
    // .then(console.log)

    fetch(peopleURL)
    .then(res => res.json())
    .then(data => createCharacterBoard(data))
    newPersonForm.remove()
    newPlayerForm.remove()
    alert("You may not make changes to the game board once match starts!")
  } else if (e.target === newPersonForm){
    console.log(newPersonForm.name.value, newPersonForm.pic.value)
  
    fetch(peopleURL, {
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accept":"application/json"},
      body: JSON.stringify({
        name: newPersonForm.name.value,
        picture: newPersonForm.pic.value
      })
    })
    .then(res => res.json)
    .then(()=>{
      fetch(peopleURL)
      .then(res => res.json())
      .then(data => createCharacterBoard(data))
      newPersonForm.reset()
      newPersonForm.remove()

    })
    }
  })

  
  
  document.addEventListener('click', e =>{
    if(e.target.className === 'play-btn'){
      const playBtn = e.target.parentNode

      guessWhoImage.remove()
      body.appendChild(newPlayerForm)
      body.appendChild(backButton)
      playBtn.remove()
     

      // The 3 lines below belong within the submit listener above
      // here for test purposes 

      // fetch(peopleURL)
      // .then(res => res.json())
      // .then(data => createCharacterBoard(data))
      // welcomeDiv.append(winBtn)

      // newPlayerForm.remove()
      e.target.parentNode.remove()

    } else if(e.target.className === 'flip-btn'){
      const button = e.target
      const buttonParentNode = button.parentNode
      const name = buttonParentNode.children[0]
      const image = buttonParentNode.children[1]
        if (image.style.filter === '') {
          image.style.filter = 'grayscale(100%)'
          // image.style.visibility = “hidden”
          name.style.visibility = 'hidden'
        } else {
          image.style.filter = ''
          // image.style.visibility = ‘’
          name.style.visibility = ''
        }
    } else if (e.target.id === 'edit'){
      newPlayerForm.remove()
      personDiv.innerHTML=""
      guessWhoImage.remove()
      const welcomeHeader = document.querySelector('#welcome-header')
      const playBtn = document.getElementById('select-version')
      if (!welcomeHeader){
        if (playBtn)
        {playBtn.remove()
        }
      }
      body.appendChild(newPersonForm)
      body.appendChild(backButton)
      if (welcomeHeader.innerHTML !== null){
        alert("No cheating!")
        newPersonForm.remove()
        fetch(peopleURL)
        .then(res => res.json())
        .then(data => createCharacterBoard(data))
      }
    } else if(e.target.id == 'win-btn'){
      const playerId = welcomeDiv.dataset.id
      welcomeDiv.dataset.wins = parseInt(welcomeDiv.dataset.wins) + 1

      // const winsCounter = welcomeDiv.dataset.wins
      document.querySelector('#winNum').innerText = welcomeDiv.dataset.wins
      
      fetch(`${playerURL}/${playerId}`,{
        method: 'PATCH',
        headers:{
          'accept': 'application/json',
          'content-type': 'application/json'
          },
        body: JSON.stringify({
          wins: welcomeDiv.dataset.wins})
      })
    } else if(e.target.id == 'lose-btn'){
      const playerId = welcomeDiv.dataset.id
      welcomeDiv.dataset.lose = parseInt(welcomeDiv.dataset.lose) + 1
      // const lossesCounter = welcomeDiv.dataset.lose
      document.querySelector('#loseNum').innerText = welcomeDiv.dataset.lose

      fetch(`${playerURL}/${playerId}`,{
        method: 'PATCH',
        headers:{
          'accept': 'application/json',
          'content-type': 'application/json'
          },
        body: JSON.stringify({
          losses:  welcomeDiv.dataset.lose})
      })

    } 
    else if (e.target.id === 'del'){
      fetch(peopleURL)
      .then(res => res.json())
      .then(data => deleteCharacterBoard(data))
      .then(()=>{
        let deleteButtons = document.querySelectorAll('.flip-button')
      const welcomeHeader = document.querySelector('#welcome-header')
      const playBtn = document.getElementById('select-version')
      if (playBtn){playBtn.remove()}
      guessWhoImage.remove()
      newPersonForm.remove()
      newPlayerForm.remove()
      body.appendChild(backButton)
      if (welcomeHeader.innerHTML !== null){
        alert("No cheating!")
        newPersonForm.remove()
        personDiv.innerHTML=""
        fetch(peopleURL)
        .then(res => res.json())
        .then(data => createCharacterBoard(data))
      }
      })
    } else if(e.target.className === 'del-btn'){
      console.log(e.target.parentNode.dataset.id)
      fetch(peopleURL+`/${e.target.parentNode.dataset.id}`,
      {method: "DELETE",
      headers: {"content-type":"application/json",
      "accept":"application/json"
    }
    })
       fetch(peopleURL)
      .then(res => res.json())
      .then(data => deleteCharacterBoard(data))
      .then(()=>{
        let deleteButtons = document.querySelectorAll('.flip-button')
      const welcomeHeader = document.querySelector('#welcome-header')
      const playBtn = document.getElementById('select-version')
      if (playBtn){playBtn.remove()}
      guessWhoImage.remove()
      newPersonForm.remove()
      newPlayerForm.remove()
      body.appendChild(backButton)
      })
      fetch(peopleURL)
      .then(res => res.json())
      .then(data => deleteCharacterBoard(data))
    }
    
    
  })

  function createCharacterBoard(people){
      people.forEach(function(personInfo){
      // console.log(personInfo)
      const personLi = createPersonDiv(personInfo)
      // const personLi = document.createElement('li')
      // personLi.innerText = "beef"
      personDiv.append(personLi)
    })
  }

  function createPersonDiv(person){
    let div = document.createElement('div')
    div.className = "card"
    div.dataset.id = person.id
    div.innerHTML = `
    <h2>${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="flip-btn"> Flip Card </button>
    `
    return div
  }


  function deleteCharacterBoard(people){
    personDiv.innerHTML=""
    people.forEach(function(personInfo){
    // console.log(personInfo)
    const personLi = deletePersonDiv(personInfo)
    // const personLi = document.createElement('li')
    // personLi.innerText = "beef"
    personDiv.append(personLi)
  })
}

  function deletePersonDiv(person){
    let div = document.createElement('div')
    div.className = "card"
    div.dataset.id = person.id
    div.innerHTML = `
    <h2>${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="del-btn"> Delete Character </button>
    `
    return div
  }

  function renderPlayer(player) {
    const playerHeader = document.createElement('h1')
    playerHeader.id = "welcome-header"
    playerHeader.innerHTML = `
    <h1> Welcome ${player.name} </h1>

    <p id = 'win-tracker'> Wins <span id = 'winNum' > 0 </span> </p>
    <p id = 'losses-tracker'> Losses <span id = 'loseNum' > 0 </span> </p>

    `
    welcomeDiv.dataset.id = player.id
    welcomeDiv.dataset.wins = player.wins
    welcomeDiv.dataset.lose = player.losses
    welcomeDiv.dataset.name = player.name
    
    welcomeDiv.append(playerHeader)
    welcomeDiv.append(winBtn)
    welcomeDiv.append(loseBtn)

  }

  




  
});