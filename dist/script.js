// click on the box cover to open and play the music.
// music source: (free music) youtube audio library - Fur Elise (by Beethoven).
// tested in the Firefox browser.

let input = document.getElementById("music");
let audio = document.getElementById("player");

input.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
    audio.currentTime = 0;
    input.innerHTML = "Pause";
  } else {
    audio.pause();
    input.innerHTML = "Play";
  }
});