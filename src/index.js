
document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")
  const peopleURL = 'http://localhost:3000/api/v1/people'
  const playerURL = 'http://localhost:3000/api/v1/players'
  const backButton = document.createElement('button')
  backButton.innerHTML = `<a href="">Back</a>`
  const welcomeDiv = document.querySelector('#welcome-message')
  
  
  const newPlayerForm = document.createElement('form')
  newPlayerForm.id = "new-player-form"
  newPlayerForm.innerHTML = `<label for="name">Your name:</label>
  <input  type="text" id="name" name="name"><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`
  
  const newPersonForm = document.createElement('form')
  newPersonForm.id = "new-person-form"
  newPersonForm.innerHTML = `<label for="name">Character's name:</label>
  <input  type="text" id="name" name="char-name"><br>
  <label for="pic">Character's picture:</label>
  <input  type="text" id="pic" name="char-pic"><br>
  <input id= "char-submit-button" type="submit" value="Submit"></input>`


  

  document.addEventListener("submit", function(e){
    if (e.target.id === "submit-button"){
    e.preventDefault()
    console.log(newPlayerForm.name.value)
    fetch(playerURL,{
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accept":"application/json"},
      body: JSON.stringify({
        name: newPlayerForm.name.value
      })
    })
    .then(res => res.json())
    .then(renderPlayer)

    fetch(peopleURL)
    .then(res => res.json())
    .then(data => createCharacterBoard(data))

    newPlayerForm.remove()
  } else if (e.target.id === "char-submit-button"){
    e.preventDefault()
    console.log(newPersonForm.char-name.value)
    fetch(peopleURL,{
      method: "POST",
      headers: {
        "content-type":"application/json",
        "accept":"application/json"},
      body: JSON.stringify({
        name: newPersonForm.char-name.value,
        picture: newPersonForm.char-pic.value
      })
    })
    .then(res => res.json())
    .then(renderPerson)

    fetch(peopleURL)
    .then(res => res.json())
    .then(data => createCharacterBoard(data))
  }
  })

  function renderPlayer(player) {
    const playerHeader = document.createElement('h1')
    playerHeader.innerText = `Welcome ${player.name}`
    console.log(playerHeader)
    welcomeDiv.append(playerHeader)
  }
  
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

      // newPlayerForm.remove()

    } else if(e.target.className.id === 'flip-btn'){
      const button = e.target
      const buttonParentNode = button.parentNode
      buttonParentNode.remove()
    } else if(e.target.id === 'edit'){
      const playBtn = document.getElementById('choices-button')
      playBtn.remove()
      guessWhoImage.remove()
      body.appendChild(newPersonForm)
      body.appendChild(backButton)
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

  // function cre
  




  
});