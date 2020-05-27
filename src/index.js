document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")
  const peopleURL = 'http://localhost:3000/api/v1/people'
  const playerURL = 'http://localhost:3000/api/v1/players'
  const backButton = document.createElement('button')
  backButton.innerHTML = `<a href="">Back</a>`
  const welcomeDiv = document.querySelector('#welcome-message')
  const playBtn = document.getElementById('select-version')

  
  const newPlayerForm = document.createElement('form')
  newPlayerForm.id = "new-player-form"
  newPlayerForm.innerHTML = `<h2>New Player</h2><label for="name">Your name:</label>
  <input  type="text" id="name" name="name"><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`


  const newPersonForm = document.createElement('form')
  newPersonForm.id = "new-person-form"
  newPersonForm.innerHTML = `<h2>Create Character</h2><label for="name">Person's name:</label>
  <input  type="text" id="char-name" name="name"><br>
  <label for="name">Person's Pic</label>
  <input  type="text" id="char-pic" name="pic"><br>
  <input id= "char-submit-button" type="submit" value="Submit"></input>`

  const delPersonForm = document.createElement('form')
  delPersonForm.id = "del-person-form"
  delPersonForm.innerHTML = `<h2>Remove Character</h2><br><label for="name">Person's name:</label>
  <input  type="text" id="del-name" name="name"><br>
  <input id= "submit-button" type="submit" value="Delete"></input>`

  function createNotAppend(people){
    people.forEach(function(personInfo){
    const personListItem = createPersonDiv(personInfo)})}

    fetch(peopleURL)
    .then(r => r.json())
    .then(data => createNotAppend(data))
  

  document.addEventListener("submit", function(e){
    e.preventDefault()
    if(e.target === newPlayerForm){
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
    delPersonForm.remove()
    alert("You may not make changes to the gameboard once match starts!")
  } else if (e.target === newPersonForm){
  
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
  .then(res => res.json())

  fetch(peopleURL)
  .then(res => res.json())
  .then(data => createCharacterBoard(data))
  newPersonForm.remove()
  backButton.remove()
  } 
  else if (e.target === delPersonForm){
    console.log(div)
//     if (e.target.name.value === ){
  
//     fetch(peopleURL+`/${}`, {
//       method: "DELETE",
//       headers: {
//         "content-type":"application/json",
//         "accept":"application/json"}
//   })

//   fetch(peopleURL)
//   .then(res => res.json())
//   .then(data => createCharacterBoard(data))
//   .then(alert("The character has been deleted."))
//   .then(delPersonForm.remove())
// }
  }
  })

  function renderPlayer(player) {
    const playerHeader = document.createElement('h1')
    playerHeader.id = "welcome-header"
    playerHeader.innerText = `Welcome ${player.name}`
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
      delPersonForm.remove()
      const welcomeHeader = document.querySelector('#welcome-header')
      if (!welcomeHeader){
        playBtn.remove()
      }
      guessWhoImage.remove()
      delPersonForm.remove()
      personDiv.remove()
      body.appendChild(newPersonForm)
      body.appendChild(backButton)

      
      if (welcomeHeader){
        alert("No cheating!")
        newPersonForm.remove()
      }
    } else if (e.target.id === 'del'){
      guessWhoImage.remove()
      newPersonForm.remove()
      newPlayerForm.remove()
      const welcomeHeader = document.querySelector('#welcome-header')
      if (!welcomeHeader){
        playBtn.remove()
      }
      body.appendChild(delPersonForm)
      body.appendChild(backButton)
      playBtn.remove()
      if (welcomeHeader){
        alert("No cheating!")
        newPersonForm.remove()
      }
    }
    
    
  })

  function createCharacterBoard(people){
      people.forEach(function(personInfo){
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