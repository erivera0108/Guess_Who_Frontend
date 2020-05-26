let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')
  const newPlayerForm = document.createElement('form')
  newPlayerForm.innerHTML = `<label for="lname">Your name:</label>
  <input id= "" type="text" id="name" name="name"><br><br>
  <input id= "submit-button" type="submit" value="Submit"></input>`

  const backButton = document.createElement('button')
  backButton.innerText = "Back"
  newPlayerForm.id = "new-player-form"

  const body = document.querySelector('body')

  document.addEventListener("submit", function(e){
    if(e.target.className === '#submit-button'){
      // POST
    }
  })
  
  document.addEventListener('click', e =>{
    if(e.target.className === 'play-btn'){
      guessWhoImage.remove()
      body.appendChild(newPlayerForm)
      body.appendChild(backButton)
    }
    

  })







  
});
