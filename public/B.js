
document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect();
    
    const startButton = document.getElementById('startbutton');
    const startOptionButton = document.getElementById('start-option');

    const pathbuttons = document.getElementById('pathbuttons');
    const pathOption1Button = document.getElementById('path-option-1');
    const pathOption2Button = document.getElementById('path-option-2');

    const attackbuttons = document.getElementById('attackbuttons');
    const attackOption1Button = document.getElementById('attack-option-1');
    const attackOption2Button = document.getElementById('attack-option-2');
  

    const codebuttons = document.getElementById('codebuttons');
    const codeOption1Button = document.getElementById('code-option-1');
    const codeOption2Button = document.getElementById('code-option-2');
    const codeOption3Button = document.getElementById('code-option-3');


    const againButton = document.getElementById('againbutton');
    const againOptionButton = document.getElementById('again-option');
    
  
    const time = document.getElementById('time');
    const timerContainer = document.getElementById('timer-container');




    let timerInterval; // Variable to store the timer interval
    
    startOptionButton.addEventListener('click', () => {
      startAdventure('start-option');
    });
  
    pathOption1Button.addEventListener('click', () => {
      pathChoice('path-option-1');
    });
  
    pathOption2Button.addEventListener('click', () => {
      pathChoice('path-option-2');
    });
  
    attackOption1Button.addEventListener('click', () => {
      attackChoice('attack-option-1');
    });
  
    attackOption2Button.addEventListener('click', () => {
      attackChoice('attack-option-2');
    });
  
    codeOption1Button.addEventListener('click', () => {
      codeChoice('code-option-1');
    });
  
    codeOption2Button.addEventListener('click', () => {
      codeChoice('code-option-2');
    });
  
    codeOption3Button.addEventListener('click', () => {
      codeChoice('code-option-3');
    });

    againOptionButton.addEventListener('click', () => {
        startAgain('again-option');
      });  
  
    function startAdventure(choice) {
      startButton.style.display = 'none';
      socket.emit('startAdventure',choice);
    }

    socket.on('connect', () => {
        console.log('Connected to the server');

        // Add your logic here if needed after a successful connection
        // For example, you can set up additional event listeners or perform other tasks
    });

    socket.on('displayPathOptions', () => {
        pathbuttons.style.display = 'block';
    });

    function pathChoice(choice) {
        pathbuttons.style.display = 'none';
        socket.emit('pathChoice', choice);
    }

//     function afterTakeoff() {
//       document.getElementById('game-play2').style.display = 'block';
//       socket.emit('afterTakeoff');
//     }
  
//     function pathChoice(choice) {
//       document.getElementById('game-play2').style.display = 'none';
//       socket.emit('pathChoice', choice);
//       setTimeout(() => {
//         afterPath();
//         resetTimer();
//       }, 32000);
//     }
  
//     function afterPath() {
//       document.getElementById('game-play3').style.display = 'block';
//       socket.emit('afterPath');
//     }
  
//     function attackChoice(choice) {
//       document.getElementById('game-play3').style.display = 'none';
//       socket.emit('attackChoice', choice);
//       setTimeout(() => {
//         afterAttack();
//         resetTimer();
//       }, 15000);
//     }
  
//     function afterAttack() {
//       document.getElementById('game-play4').style.display = 'block';
//       socket.emit('afterAttack');
//     }
  
//     function codeChoice(choice) {
//       document.getElementById('game-play4').style.display = 'none';
//       socket.emit('codeChoice', choice);
//       setTimeout(() => {
//         afterCode();
//         resetTimer();
//       }, 19000);
//     }
  
//     function afterCode() {
//       document.getElementById('game-play5').style.display = 'block';
//       socket.emit('afterCode');
//       setTimeout(() => {
//         doyouwanna();
//         resetTimer();
//       }, 6000);
  
//     }
  
//     function doyouwanna() {
//       document.getElementById('game-play1').style.display = 'block';
//       document.getElementById('game-play2').style.display = 'none';
//       document.getElementById('game-play3').style.display = 'none';
//       document.getElementById('game-play4').style.display = 'none';
//       document.getElementById('game-play5').style.display = 'none';
//       socket.emit('doyouwanna');
//     }
  
//     function startAgain() {
//       resetTimer();
//       document.getElementById('game-play2').style.display = 'none';
//       document.getElementById('game-play3').style.display = 'none';
//       document.getElementById('game-play4').style.display = 'none';
//       document.getElementById('game-play5').style.display = 'none';
//       socket.emit('startAgain');
//       location.reload(true);
//     }
  
  
//     function resetTimer() {
//       clearInterval(timerInterval);
//       timerContainer.textContent = ''; // Clear the timer display
//     }
  
  
//     // Listen for 'timerExpired' event to handle game over state
//     socket.on('timerExpired', () => {
//       // Perform actions when the timer expires (e.g., restart the game)
//       timerContainer.textContent = ``;
//       startAgain();
//     });
  
//     socket.on('startTimer', () => {
//       let timeLeft = 120; // 2 minutes in seconds
  
//       // Timer logic
//       timerInterval = setInterval(() => {
//         const minutes = Math.floor(timeLeft / 60);
//         const seconds = timeLeft % 60;
//         timerContainer.textContent = `YOU ONLY HAVE ${minutes}:${seconds} LEFT TO ANSWER`;
//         if (timeLeft <= 0) {
//           clearInterval(timerInterval);
//           socket.emit('timerExpired');
//         } else {
//           timeLeft--;
//         }
//       }, 1000);
//     });
  
//     socket.on('stopTimer', () => {
//       clearInterval(timerInterval);
//       timerContainer.textContent = ` `;
//     });
  
  
//    /*  socket.on('resetGame', () => {
//       resetTimer(); // Reset the timer
//       document.getElementById('game-play1').style.display = 'block'; // Display the initial screen
//       document.getElementById('game-play2').style.display = 'none';
//       document.getElementById('game-play3').style.display = 'none';
//       document.getElementById('game-play4').style.display = 'none';
//       document.getElementById('game-play5').style.display = 'none';
//     }); */
  
//     socket.on('aftergameover', () => {
//       resetTimer();
//       startAgain();
//     });
  
//     socket.on('doyouwanna', () => {
//       resetTimer();
//       doyouwanna();
//     });
  
  
     });
    