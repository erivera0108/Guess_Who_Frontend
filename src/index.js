
document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")
  const newPlayerForm = document.createElement('form')
  newPlayerForm.id = "new-player-form"
  const peopleURL = 'http://localhost:3000/api/v1/people'
  const playerURL = 'http://localhost:3000/api/v1/players'
  const backButton = document.createElement('button')
  backButton.innerText = "Back"
  
  newPlayerForm.innerHTML = `<label for="name">Your name:</label>
  <input  type="text" id="name" name="name"><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`
  


  

  document.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(newPlayerForm.name.value)
    fetch("http://localhost:3000/api/v1/players",{
      method: "POST",
      headers: {"content-type":"application/json",
    "accept":"application/json"},
      body: JSON.stringify({
        name: newPlayerForm.name.value
      })
    })
    .then(res => res.json())
        .then(data => console.log(data))
        .then(newPlayerForm.remove)
    // .then(data => createCharacterBoard(data))
    // .then(newPlayerForm.remove())
  })
  
  document.addEventListener('click', e =>{
    if(e.target.className === 'play-btn'){

      guessWhoImage.remove()
      body.appendChild(newPlayerForm)
      body.appendChild(backButton)

      // The 3 lines below belong within the submit function above
      // here for test purposes 

      fetch(peopleURL)

      .then(res => res.json())
      .then(data => createCharacterBoard(data))

      // newPlayerForm.remove()
      e.target.parentNode.remove()
    } else if(e.target.className === 'flip-btn'){
      const button = e.target
      const buttonParentNode = button.parentNode
      buttonParentNode.remove()
      // console.log(buttonParentNode)
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
    div.innerHTML = `
    <h2>${person.name}</h2>
    <img src=${person.picture} class="person-avatar"/>
    <button class="flip-btn"> Flip Card </button>
    `
    return div
  }
  




  
});
