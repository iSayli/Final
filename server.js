
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'server.html'));
  });
  
  // Serve A.html when accessing /A
app.get('/A', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'A.html'));
});
  
  // Serve B.html when accessing /B
app.get('/B', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'B.html'));
});
  
  // ...

let gameState = {
  scene: 1,
  bChoice: null,
};
  

function scene2intro() {
  gameState.scene = 2;
  io.emit('updateState', gameState);
}

function scene3pathoption() {
  gameState.scene = 3;
  io.emit('updateState', gameState);
}

function scene4asteroid() {
  gameState.scene = 4;
  io.emit('updateState', gameState);
}

function scene5attackoption() {
  gameState.scene = 5;
  io.emit('updateState', gameState);
}

function scene6cloud() {
  gameState.scene = 6;
  io.emit('updateState', gameState);
}

function scene7codeoption() {
  gameState.scene = 7;
  io.emit('updateState', gameState);
}

function scene8cargo() {
  gameState.scene = 8;
  io.emit('updateState', gameState);
}

function scene9victory() {
  gameState.scene = 9;
  io.emit('updateState', gameState);
}


function scenelost() {
  gameState.scene = 99;
  io.emit('updateState', gameState);
}

function timerExpired() {
  gameState.scene = 0;
  io.emit('updateState', gameState);
}

function scenestartagain() {
  gameState.scene = 100;
  io.emit('updateState', gameState);
}

function round2startscene() {
  gameState.scene = 21;
  io.emit('updateState', gameState);
}


let timerInterval; // Variable to store the timer interval
const timerDuration = 120; // 2 minutes in seconds


function startTimer() {
   clearInterval(timerInterval); // Clear any existing timers

   const startTime = Date.now();

   // Notify clients to start the timer
   io.emit('startTimer');

   // Timer logic
   timerInterval = setInterval(() => {
     const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert milliseconds to seconds
     if (elapsedTime >= timerDuration) {
       // Time is up, trigger game over
       io.emit('timerExpired');
       timerExpired();
       stopTimer(); // Clear the interval when the timer expires
     }
   }, 1000);
}

 function stopTimer() {
   clearInterval(timerInterval);
   io.emit('stopTimer');
 }


io.on('connection', (socket) => {
  
   socket.on('startAdventure', (choice)=>{
    gameState.bChoice = choice;
    scene2intro();
    stopTimer();
   });

   socket.on('pathOptionScene', ()=>{
    scene3pathoption();
    io.emit('displayPathOptions');
    startTimer();
  });

  socket.on('pathChoice', (choice) => {
    
    gameState.bChoice = choice;
    if (gameState.bChoice === 'path-option-1') {
      stopTimer();
      scene4asteroid();
    } else if (gameState.bChoice === 'path-option-2') {
      stopTimer();
      scenelost();
    }

  });

  socket.on('attackOptionScene', ()=>{
    scene5attackoption();
    io.emit('displayAttackOptions');
    startTimer();

  });
  
  socket.on('attackChoice', (choice) => {
    
    gameState.bChoice = choice;
    if (gameState.bChoice === 'attack-option-1') {
      stopTimer();
      scene6cloud();
    } else if (gameState.bChoice === 'attack-option-2') {
      stopTimer();
      scenelost();
    }

  });

  socket.on('codeOptionScene', ()=>{
    scene7codeoption();
    io.emit('displayCodeOptions');
    startTimer();
  });

  socket.on('codeChoice', (choice) => {
    
    gameState.bChoice = choice;
    if (gameState.bChoice === 'code-option-1') {
      stopTimer();
      scene8cargo();
    } else if (gameState.bChoice === 'code-option-2') {
      stopTimer();
      scenelost();
    } else if (gameState.bChoice === 'code-option-2') {
      stopTimer();
      scenelost();
    }

  });

  socket.on('victoryScene', ()=>{
    stopTimer();
    scene9victory();
  });

  socket.on('startAgainScene', ()=>{
    stopTimer();
    scenestartagain();
    io.emit('startAgain');
  });

  socket.on('startAgainPressed', ()=>{
    stopTimer();
    round2startscene();
    io.emit('startAgain');
  });


  socket.on('round2startscene', ()=>{
    stopTimer();
    round2startscene();
    io.emit('startround2');
  });

  socket.on('aftertimeover', ()=>{
    stopTimer();
    scenelost();
    });

});

/* const port = process.env.PORT || 3000;
server.listen(port, () => {
console.log(`Server is running on https://choices-production.up.railway.app/`);
}); */

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
