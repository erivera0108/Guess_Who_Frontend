let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const guessWhoImage = document.querySelector('#guess-who-image')

  document.addEventListener('click', e =>{
    if(e.target.className === 'play-btn'){
      guessWhoImage.remove()
    }

  })







  
});
