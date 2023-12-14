
document.addEventListener('DOMContentLoaded', () => {
    const socket = io.connect('https://final-production-dd09.up.railway.app/');
    
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
      pathbuttons.style.display = 'none';
      attackbuttons.style.display = 'none';
      codebuttons.style.display = 'none';
      againButton.style.display = 'none';
      socket.emit('startAdventure',choice);
    }

    socket.on('displayPathOptions', () => {
        startButton.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        pathbuttons.style.display = 'block';
    });

    function pathChoice(choice) {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        socket.emit('pathChoice', choice);
    }

    socket.on('displayAttackOptions', () => {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        attackbuttons.style.display = 'block';
    });

    function attackChoice(choice) {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        
        socket.emit('attackChoice', choice);
    }

    socket.on('displayCodeOptions', () => {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        codebuttons.style.display = 'block';
    });

    function codeChoice(choice) {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
  
        socket.emit('codeChoice', choice);
    }

    socket.on('startAgain', () => {
        startButton.style.display = 'none';
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
  
        againButton.style.display = 'block';
    });
    

    function startAgain(choice) {
        pathbuttons.style.display = 'none';
        attackbuttons.style.display = 'none';
        codebuttons.style.display = 'none';
        againButton.style.display = 'none';
        location.reload(true);
        io.emit('startAgainPressed');
    }

    socket.on('reloadPage', () => {
      location.reload(true); // Reload the entire page
    });

 
  
     // Listen for 'timerExpired' event to handle game over state
     socket.on('timerExpired', () => {
       startButton.style.display='none';
       pathbuttons.style.display='none';
       attackbuttons.style.display='none';
       codebuttons.style.display='none';
       againButton.style.display='none';

       time.style.display='none';
       timerContainer.textContent = ``;
    });
  
     socket.on('startTimer', () => {
       let timeLeft = 240; // 2 minutes in seconds
  
       // Timer logic
       timerInterval = setInterval(() => {
         const minutes = Math.floor(timeLeft / 60);
         const seconds = timeLeft % 60;
         time.style.display='block';
         timerContainer.textContent = `${minutes}:${seconds}`;
         if (timeLeft <= 0) {
           clearInterval(timerInterval);
         } else {
           timeLeft--;
         }
       }, 1000);
    });
  
     socket.on('stopTimer', () => {
       clearInterval(timerInterval);
       time.style.display='none';
       timerContainer.textContent = ` `;
     });
  
  
  
     });
    