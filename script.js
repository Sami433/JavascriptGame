const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 0;
gameOverNumber = 80;
loopPlay = false;

function start() {
  count = 0;
  getFaster = 2000;
  daysRemaining = daysLeft; 

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  // make sure to not play loop several times
  loopPlay ? '' : game();   
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (count==40 ) {
        youWin();
      } else if (canvas.childElementCount < gameOverNumber || daysRemaining==45){
        virusPop();
        game();
      } else {
        gameOver();
      }
    }, randomTime);  
  };

  const gameOver = () => {
    endScreen.innerHTML = `<div class="gameOver">Perdu! Retentes ta chance! <br/>score : ${count} </div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false;
  };


  const youWin = () => {
    let accuracy = Math.round(count / daysRemaining * 100);
    endScreen.innerHTML = `<div class="youWin">Gagné! Tu es adroit! <br/><span>Précision: ${accuracy} %</span></div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false; 
  };
};

// create random element
function virusPop() {
  let virus = new Image();

  virus.src = "./media/basic-pics/image.png"

  virus.classList.add('virus');
  virus.classList.add('virus-bis');
  virus.style.top = Math.random() * 500 + 'px';
  virus.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 80) + 30;
  virus.style.setProperty('--x', `${ x }px`);
  virus.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  virus.style.setProperty('--trX', `${ trX }%`);
  virus.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(virus);
};

// countdown on click
canvas.addEventListener('click', () => {
  if (daysRemaining < 45) {
    daysRemaining++;
    days.innerHTML = daysRemaining;
  }
});

// remove element clicked
document.addEventListener("click", function(e){
  let targetElement = e.target;

  if (targetElement.classList.contains('virus')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});

// hide and screen on click
endScreen.addEventListener('click', () => {
  start();
  setTimeout(() => {
    endScreen.style.visibility = 'hidden';
  }, 1000);
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', 'top:'+(e.pageY - 20)+"px; left:"+(e.pageX - 20)+"px;")
})

document.addEventListener('click', ()=>{
    cursor.classList.add('expand');

    setTimeout(()=>{
        cursor.classList.remove("expand");
    }, 500);
})


