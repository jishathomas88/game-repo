let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
}
updateScoreElement();

/* if(!score){
    score={
        wins:0,
        losses:0,
        ties:0
    }
}*/
console.log(JSON.parse(localStorage.getItem('score')));
 
let isAutoPlay=false;
let intervalId;
function autoPlay(){
   
   if(!isAutoPlay){
   intervalId= setInterval(()=>{
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoPlay=true;
}else{
  clearInterval(intervalId);
  isAutoPlay=false;
}
}

function pickComputerMove(){
let randomNumber=Math.random();
let computerMove='';
if(randomNumber>0 && randomNumber < 1/3){
 computerMove = 'rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove='paper';

}else{
    computerMove='scissors'
}
return computerMove
}

document.querySelector('.js-rock-button')
.addEventListener('click',()=>{
    playGame('rock')
});
document.querySelector('.js-paper-button')
.addEventListener('click',()=>{
    playGame('paper')
});
document.querySelector('.js-scissors-button')
.addEventListener('click',()=>{
    playGame('scissors')
});
document.querySelector('.js-reset-button')
.addEventListener('click',()=>{
         score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-result').innerHTML='';
        document.querySelector('.js-moves').innerHTML='';
});
document.querySelector('.js-auto-play')
.addEventListener('click',()=>{
    autoPlay();
});

document.body.addEventListener('keydown',(event)=>{
    //console.log(event.key)
    if(event.key==='r'){
        playGame('rock');
    }else if(event.key==='p'){
        playGame('paper');
    }else if(event.key==='s'){
        playGame('scissors');
    }
})

function playGame(playerMove){
let computerMove=pickComputerMove();
let result;
if(playerMove==='rock'){
        if(computerMove==='rock'){
    result='Tie';
    }else if(computerMove==='paper'){
    result='You win'
    }else if(computerMove === 'scissors'){
    result='You lose'    
    }
    
}else if(playerMove==='paper'){
        if(computerMove==='rock'){
    result='You win';
    }else if(computerMove==='paper'){
    result='Tie'
    }else if(computerMove === 'scissors'){
    result='You lose'    
    }

}else{
    if(computerMove==='rock'){
    result='You lose';
    }else if(computerMove==='paper'){
    result='You win'
    }else if(computerMove === 'scissors'){
    result='Tie'    
    }
}

if(result==="You win"){
    score.wins+=1;
}
else if(result==="You lose"){
    score.losses+=1;
}else if(result==="Tie"){
    score.ties+=1;
}

localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML=result;
// document.querySelector('.js-moves').innerHTML=`You ${playerMove} - ${computerMove} computer`
document.querySelector('.js-moves').innerHTML=`
You 
    <img class="move-icon" src='${playerMove}-emoji.png'>
    <img class="move-icon" src='${computerMove}-emoji.png'>
    Computer`
/*alert(`you picked ${playerMove}.Computer picked ${computerMove}.${result}
wins:${score.wins},losses:${score.losses},Ties:${score.ties}
`);*/

}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins:${score.wins},losses:${score.losses},Tie:${score.ties}`;   
}