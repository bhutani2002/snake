window.onload=function(){
// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 12;
let score = 0;
let lastPaintTime = 0;
var letters;
let snakeArr = [
    {x: 15, y: 15 }
];
let food={x:7,y:7};

//Game Functions
function main(ctime)
{
  window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed)
    return;
    lastPaintTime=ctime;
  gameEngine();
}
function isCollide(snake)
{
  //1. If snake collides into itself
    for(i=1;i<snake.length;i++)
    {
      if(snake[0].x==snake[i].x && snake[0].y==snake[i].y)
      return true;
    }

  //2. If snake collides into the bounderies of the game board
    if(snake[0].x>=18|| snake[0].x<=0||snake[0].y>=18|| snake[0].y<=0)
    return true;

    return false;
}
function gameEngine()
{
     letters= document.getElementById("name").value;
     const search=document.forms['search'];
     search.addEventListener('submit',function (e) {
       e.preventDefault();
     })
  //Part 1: Updating the snake array & Food
  if(isCollide(snakeArr))
  {
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0, y:0};
    alert("Game Over! Press any key to play again!");
    snakeArr=[ {x: 15, y: 15 }]
    musicSound.play();
    score=0;
    scoreBox.textContent = "Score: " + score;
  }

  //If the snake has eaten the food, then increment the score and regenerate the food.
  if(snakeArr[0].x == food.x && snakeArr[0].y == food.y)
  {
    foodSound.play();
    score++;
    // Score=score;
    // localStorage.setItem("Score", JSON.stringify(scoreval));
    // // scoreBox.innerHTML = "Score: " + scoreval;
    // if(Score>hiscoreval)
    // {
    //    var x=document.querySelector('table tr:nth-child(2) td:nth-child(2)');
    //    x.innerHTML=hiscoreval;
    //    var z=x.querySelector('td:nth-child(3)');
    //    z.innerHTML=score;
    // }
    if(score>hiscoreval){
        hiscoreval = score;
        hiscorer=letters;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        localStorage.setItem("highest", JSON.stringify(hiscorer));
        hiscoreBox.innerHTML = "High-Score: " + hiscoreval;
        highestscorer.innerHTML="Highest Scorer: "+ hiscorer;
    }
    scoreBox.textContent= "Score: "+ score;
    snakeArr.unshift({x: snakeArr[0].x+ inputDir.x,y: snakeArr[0].y + inputDir.y});
    let a=2;
    let b= 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
  }

  //Moving the snake
  for(i=snakeArr.length - 2;i>=0;i--)
  snakeArr[i+1]={...snakeArr[i]};

  snakeArr[0].x+=inputDir.x;
  snakeArr[0].y+=inputDir.y;


  //Part 2: Display the snake and food
  //Display the snake
  board.innerHTML="";
  snakeArr.forEach(function(e,index){
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index==0)
    {
      snakeElement.classList.add('head');
    }
    else {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  })

    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic of game
  musicSound.play();
  let hiscore= localStorage.getItem('hiscore'); //We can also use sessionStorage
  if(hiscore==null)
  {
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
  }
  else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High-Score: " + hiscore;
  }

  let highest= localStorage.getItem('highest'); //We can also use sessionStorage
  if(highest==null)
  {
    hiscorer="";
    localStorage.setItem("highest",JSON.stringify(hiscorer));
  }
  else {
    hiscorer = JSON.parse(highest);
    highestscorer.innerHTML = "Highest Scorer: " + highest;
  }



  // let Score= localStorage.getItem('Score');
  // if(Score==null)
  // {
  //   scoreval=0;
  //   localStorage.setItem("Score",JSON.stringify(scoreval));
  // }
  // else {
  //   scoreval = JSON.parse(Score);
  //   scoreBox.innerHTML = "Score: " + Score;
  // }

  console.log(hiscore);
  window.requestAnimationFrame(main);
  // if(letters==null)
  // alert("Please Enter Your Name Before Starting The Game, To Have A Complete Ease On Up Play!");
  window.addEventListener('keyup',e=>{
    inputDir={x:0, y:0}
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
          console.log("ArrowUp");
          inputDir.x = 0;
          inputDir.y = -1;
          break;
      case "ArrowDown":
          console.log("ArrowDown");
          inputDir.x = 0;
          inputDir.y = 1;
          break;
      case "ArrowLeft":
          console.log("ArrowLeft");
          inputDir.x = -1;
          inputDir.y = 0;
          break;
      case "ArrowRight":
          console.log("ArrowRight");
          inputDir.x = 1;
          inputDir.y = 0;
          break;
      default: break;

    }
  })

}
