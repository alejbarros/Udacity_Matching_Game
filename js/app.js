$(document).ready(function() {

      const deck = document.querySelector(".deck");
      let card = document.getElementsByClassName("card");
      let cards = [...card];

      var moves = 0;
      var first_move = 0;
      var second_move = 1;
      var total_moves_per_turn = 2;
      var turnTotal = 0;
      var cardsMatch = 0;
      var success = 8;
      var modal = $('.modal');
      var turn_modal = $('.moves_taken');
      var timer_realtime = $('.time_taken');


      var second = 0, minute = 0, hour = 0;
      var timer = document.querySelector(".timer");
      var interval;
      var initTime = 0;

      startGame();

      $('.card').click(function() {

            if(moves === first_move) {
              $(this).addClass('open');
              $(this).addClass('show');
              first_card = $(this);
              first_card_type = $(this).find('i').attr('class');
              moves++;
            }
            else if (moves === second_move) {
              $(this).addClass('open');
              $(this).addClass('show');
              second_card = $(this);
              second_card_type = $(this).find('i').attr('class');
              var index_first_card = $('li').index(first_card);
              var index_second_card = $('li').index(second_card);
              if(first_card_type ==  second_card_type && index_first_card != index_second_card){
                first_card.addClass('match');
                second_card.addClass('match');
                moves = 0;
                turnTotal++;
                cardsMatch++;
              } else {
                first_card.addClass('not_match');
                second_card.addClass('not_match');
                animateCard(first_card);
                animateCard(second_card);
                moves = 0;
                turnTotal++;
                resetCards(first_card,second_card);
              }
            };
            if(initTime == 0){
              second = 0;
              minute = 0;
              hour = 0;
              startTimer();
              initTime = 1;
            }
            if (cardsMatch == success ){
              gameSuccess();
            }
            updateActivity();
        });

            function updateActivity(){
              $('.score-panel').find('.moves').text(turnTotal);
            }

            function animateCard(card) {
              card.animate({height: '130px',width: '130px', opacity: '0.8'}, "slow");
              card.animate({height: '145px',width: '145px', opacity: '0.4'}, "slow");
              card.animate({height: '165px',width: '165px', opacity: '0.2'}, "slow");
              card.animate({height: '125px',width: '125px', opacity: '1'}, "slow");
            }

            function resetCards(first_card, second_card) {
                  setTimeout(function(){
                        first_card.removeClass('not_match open show');
                        second_card.removeClass('not_match open show');
                  },2000);
            };

            function shuffle(array) {
              var currentIndex = array.length, temporaryValue, randomIndex;
              while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }
              return array;
            }

            function startGame(){
              var shuffledCards = shuffle(cards);
                for (var i= 0; i < shuffledCards.length; i++){
                    [].forEach.call(shuffledCards, function(item){
                        deck.appendChild(item);});
                }
            }

            $('.restart').click(function() {
              restart();
            });

            function restart(){
               turnTotal = 0;
               $('.card').removeClass('open match show');
               initTime = 0;
               timer.innerHTML = 0+" secs";
               startGame();
               updateActivity();
            }

            function gameSuccess() {
                modal.css('display', 'block');
                timer_realtime.text("Your time was : " + minute + "mins " + second + " secs");
                turn_modal.text("With " + turnTotal + " moves and " + "Stars.");
                    $('.play_again_button').click(function() {
                      modal.css('display', 'none');
                      cardsMatch = 0;
                      clearInterval(interval);
                      initTime = 0;
                      restart();
                      });

                };


            function startTimer(){
              interval = setInterval(function(){
              timer.innerHTML = minute+"mins "+second+"secs";
              second++;
              if(second == 60){
                  minute++;
                  second = 0;
              }
              if(minute == 60){
                  hour++;
                  minute = 0;
                }
              },1000);
            }


});
