 let score=JSON.parse(localStorage.getItem('score'))||{
                        wins:0,
                        losses:0,
                        ties:0
                    };
                                 
                updateScoreElement();

                let isAutoPlaying = false;
                let intervalId;

                let autoplay = document.querySelector('.js-auto-play-button');
                autoplay.addEventListener('click',()=>{
                    autoPlay();
                });

                let reset = document.querySelector('.js-reset-button');
                reset.addEventListener('click',()=>{
                   showResetConfirmation();
                });

                function resetScore(){
                    score.wins=0;
                    score.losses=0;
                    score.ties=0; 
                    localStorage.removeItem('score'); 
                    updateScoreElement();
                }

                function autoPlay(){
                    if(!isAutoPlaying){
                        intervalId = setInterval(function(){
                            const playerMove=pickComputerMove();
                            playGame(playerMove);
                        },1000);
                        autoplay.innerHTML='Stop Playing';
                        isAutoPlaying = true;
                    }
                    else{
                        clearInterval(intervalId);
                        autoplay.innerHTML='Auto Play';
                        isAutoPlaying = false;
                    }
                }

                document.body.addEventListener('keydown',(event)=>{
                    if(event.key==='r'){
                        playGame('Rock');
                    } else if(event.key==='p'){
                        playGame('Paper');
                    } else if(event.key==='s'){
                        playGame('Scissors');
                    } else if(event.key==='a'){
                        autoPlay();
                    } else if(event.key==='Backspace'){
                        showResetConfirmation();
                    }
                });
            
                function playGame(playerMove){
                    const computerMove= pickComputerMove();
                    let result='';
                    if(playerMove==='Scissors'){
                        if(computerMove==='Rock'){
                            result='You lose';
                        }
                            else if(computerMove==='Paper'){
                                result='You win';
                            }
                                else{
                                    result='Tie';
                                }
                    }
                    else if(playerMove==='Paper'){
                            if(computerMove==='Rock'){
                                result='You win';
                            }
                                else if(computerMove==='Paper'){
                                    result='Tie';
                                }
                                    else{
                                        result='You lose';
                                    }
                                }else if(playerMove==='Rock') 
                                 {
                                    if(computerMove==='Rock'){
                                        result='Tie';
                                     }
                                    else if(computerMove==='Paper'){
                                        result='You lose';
                                    }
                                    else{
                                        result='You win';
                                    }
                                }

                    if(result==='You win'){
                        score.wins+=1;
                    }else if(result==='You lose'){
                        score.losses+=1;
                    }else if(result==='Tie'){
                        score.ties+=1;
                    }

                    localStorage.setItem('score',JSON.stringify(score));

                    updateScoreElement();

                    document.querySelector('.js-result').innerHTML=result;
                    document.querySelector('.js-moves').innerHTML=`You <img src="rock-paper-scissors-emojis/${playerMove}-emoji.png" class="move-icon" alt=""> <img src="rock-paper-scissors-emojis/${computerMove}-emoji.png" class="move-icon" alt=""> Computer`; 

                    
                }


                function showResetConfirmation(){
                    document.querySelector('.confirm')
                    .innerHTML=`
                      Are you sure you want to reset the score?
                      <button class="reset-confirm-yes reset-confirm">Yes</button>
                    <button class="reset-confirm-no reset-confirm">
                    No</button>
                      `;

                       document.querySelector('.reset-confirm-yes')
                .addEventListener('click',()=>{
                    resetScore();
                    hideResetConfirmation();
                });

                document.querySelector('.reset-confirm-no')
                .addEventListener('click',()=>{
                    hideResetConfirmation();
                });
                }

                function hideResetConfirmation(){
                    document.querySelector('.confirm')
                    .innerHTML=``;
                }

               
               
                function updateScoreElement(){
                     document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
                }

                    let computerMove='';
                    function pickComputerMove(){
                        const randomNumber=Math.random(); 
                        if(randomNumber>=0 && randomNumber<1/3){
                            computerMove='Rock';
                        }
                        else if(randomNumber>=1/3 && randomNumber<2/3){
                            computerMove='Paper';
                        }
                        else{
                            computerMove='Scissors';
                        }
                    return computerMove;
                    }