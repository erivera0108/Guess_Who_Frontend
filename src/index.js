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
  newPersonForm.innerHTML = `<label for="name">Person's name:</label>
  <input  type="text" id="char-name" name="name"><br>
  <label for="name">Person's Pic</label>
  <input  type="text" id="char-pic" name="pic"><br>
  <input id= "char-submit-button" type="submit" value="Submit"></input>`
  


  

  document.addEventListener("submit", function(e){
    e.preventDefault()
    if(e.target === newPlayerForm){
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
console.log('hey')
    fetch(peopleURL)
    .then(res => res.json())
    .then(data => createCharacterBoard(data))

    newPlayerForm.remove()
    alert("You may not make changes to the gameboard once match starts!")
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

  .then(()=>{fetch(peopleURL)
  .then(res => res.json())
  .then(data => createCharacterBoard(data))
  newPersonForm.remove()
  backButton.remove()})
  }
  })

  function renderPlayer(player) {
    const playerHeader = document.createElement('h1')
    playerHeader.id = "welcome-header"
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
      const welcomeHeader = document.querySelector('#welcome-header')
      const playBtn = document.getElementById('select-version')
      if (!welcomeHeader){
        if (playBtn)
        {playBtn.remove()}
      }
      guessWhoImage.remove()
      body.appendChild(newPersonForm)
      body.appendChild(backButton)
      
      if (welcomeHeader){
        alert("No cheating!")
        newPersonForm.remove()
      }
    } else if (e.target.id === 'del'){
      fetch(peopleURL)
      .then(res => res.json())
      .then(data => createCharacterBoard(data))
    }
    
    
  })

  function createCharacterBoard(people){
      people.forEach(function(personInfo){
      // console.log(personInfo)
      const deletePersonLi = deletePersonDiv(personInfo)
      // const personLi = document.createElement('li')
      // personLi.innerText = "beef"
      deletePersonLi.append(personLi)
    })
  }

  function deletePersonDiv(person){
    let divDelete = document.createElement('div')
    divDelete.className = "card"
    divDelete.dataset.id = person.id
    divDelete.innerHTML = `
    <h2>${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="flip-btn"> Flip Card </button>
    `
    return div
  }

    function deleteCharacterBoard(people){
      people.forEach(function(personInfo){
      // console.log(personInfo)
      const deletePersonLi = createPersonDeleteDiv(personInfo)
      // const personLi = document.createElement('li')
      // personLi.innerText = "beef"
      divDelete.append(deletePersonLi)
    })
  }

  function createPersonDeleteDiv(person){
    let divDelete = document.createElement('div')
    divDelete.className = "card"
    divDelete.dataset.id = person.id
    divDelete.innerHTML = `
    <h2>${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="delete-card"> Delete</button>
    `
    return divDelete
  }

  // function cre
  




  
});