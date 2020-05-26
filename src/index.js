let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const body = document.querySelector('body')
  const personDiv = document.querySelector("#game-board")

  
  // newPlayerForm.innerHTML = `<label for="lname">Your name:</label>
  // <input id= "" type="text" id="name" name="name"><br><br>
  // <input id= "submit-button" type="submit" value="Submit"></input>`
  
  // const backButton = document.createElement('button')
  // backButton.innerText = "Back"
  // newPlayerForm.id = "new-player-form"
  
  const newPlayerForm = document.createElement('form')

  document.addEventListener("submit", function(e){
    if(e.target.className === '#submit-button'){
      // POST
    }
  })
  
  document.addEventListener('click', e =>{
    console.log('pressed')
    if(e.target.className === 'play-btn'){
      guessWhoImage.remove()
      // body.appendChild(newPlayerForm)
      // body.appendChild(backButton)
      e.target.parentNode.remove()
    }
    
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => createCharacterBoard(data))
  })
  // .then(data => console.log(data))

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
    <img src=${person.image} class="person-avatar"/>
    <button class="flip-btn"> Flip Card </button>
    `
    return div
  }
  




  
});
