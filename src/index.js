
document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")
  const peopleURL = 'http://localhost:3000/api/v1/people'
  const playerURL = 'http://localhost:3000/api/v1/players'
  // const backButton = document.createElement('button')
  // backButton.innerText = "Back"
  const welcomeDiv = document.querySelector('#welcome-message')
  
  
  const newPlayerForm = document.createElement('form')
  newPlayerForm.id = "new-player-form"
  newPlayerForm.innerHTML = `<label for="name">Your name:</label>
  <input  type="text" id="name" name="name"><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`
  const editNav = document.getElementById("edit-nav")

  const newPersonForm = document.createElement('form')
  newPersonForm.innerHTML =   `<label for="name">Character Name:</label>
  <input  type="text" id="char" name="name"><br>
  <label for="name">Character Image:</label>
  <input  type="text" id="pic" name="name"><br></br>
  <input id= "char-submit-button" type="submit" value="Submit"></input>`
  const welcomeMessage = document.querySelector('.welcome-message')


  
/** 
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
    .then(data => console.log(data))
        
    // .then(data => createCharacterBoard(data))
    // .then(newPlayerForm.remove())
  } else if(e.target.id === "char-submit-button"){
    e.preventDefault()
    console.log(newPersonForm.name.value)
    console.log(newPersonForm.pic.value)
    fetch(peopleURL,{
      method: "POST",
      headers: {"content-type":"application/json",
    "accept":"application/json"},
      body: JSON.stringify({
        name: newPersonForm.name.value,
        picture: newPersonForm.pic.value
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
    .then(renderPlayer)
    //This where the first GET request should take place Don't delete
      //fetch(peopleURL)
      //.then(res => res.json())
      //.then(data => createCharacterBoard(data))
      

    newPlayerForm.remove()
  })
*/

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
      playBtn.remove()

      // The 3 lines below belong within the submit listener above
      // here for test purposes 

      fetch(peopleURL)
      .then(res => res.json())
      .then(data => createCharacterBoard(data))

      // newPlayerForm.remove()
      e.target.parentNode.remove()

    } else if(e.target.className === 'flip-btn'){
      const button = e.target
      const buttonParentNode = button.parentNode
<<<<<<< HEAD
      const name = buttonParentNode.children[0]
      const image = buttonParentNode.children[1]
        if (image.style.filter === '') {
          image.style.filter = 'grayscale(100%)'
          // image.style.visibility = "hidden"
          name.style.visibility = 'hidden'
        } else {
          image.style.filter = ''
          // image.style.visibility = ''
          name.style.visibility = ''
        }
      // buttonParentNode.remove()
=======
      buttonParentNode.remove()
<<<<<<< HEAD
      // console.log(buttonParentNode)
    } else if(e.target.id === "edit-nav"){
      body.appendChild(newPersonForm)
      body.appendChild(backButton)
      newPersonForm.reset()
=======
>>>>>>> a706d4c27a8e182f50a3700088b34b1183e8ce94
>>>>>>> 745439c7a05fb3dc914680c2340b776057e806d7
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
    <h2 >${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="flip-btn"> Flip Card </button>
    `
    return div
  }

  // function cre
  




  
});
