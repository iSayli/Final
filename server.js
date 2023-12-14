
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


function scenelost() {
  gameState.scene = 99;
  io.emit('updateState', gameState);
}
// function startScene25() {
//   gameState.scene = 2.5;
//   io.emit('updateState', gameState);
// }


// function startScene3() {
//   gameState.scene = 3;
//   io.emit('updateState', gameState);

// }

// function startScene35() {
//   gameState.scene = 3.5;
//   io.emit('updateState', gameState);

// }


// function startScene4() {
//   gameState.scene = 4;
//   io.emit('updateState', gameState);

// }

// function startScene45() {
//   gameState.scene = 4.5;
//   io.emit('updateState', gameState);
// }

// function startScene5() {
//     gameState.scene = 5;
//     io.emit('updateState', gameState);  
// }

// function startScene54() {
//   gameState.scene = 5.4;
//   io.emit('updateState', gameState);
// }

// function doyouwanna() {
//   gameState.scene = 5.5;
//   io.emit('updateState', gameState);
//   setTimeout(() => {
//     startAgain();
//   }, 10000);    
// }

// function startScene6() {
//     gameState.scene = 6;
//     io.emit('updateState', gameState);
//     setTimeout(() => {
//       io.emit('doyouwanna');
//     }, 15000);    

// }

  
// function startAgain() {
//   io.emit('reloadPage'); // Emit an event to notify clients to reload the page
//   gameState.scene = 1;
//   gameState.bChoice = null;
// //  io.emit('resetGame'); // Emit an event to reset both clients
//   clearInterval(timerInterval); // Clear any existing timers
// }
// let timerInterval; // Variable to store the timer interval
// const timerDuration = 120; // 2 minutes in seconds


// function startTimer() {
//   clearInterval(timerInterval); // Clear any existing timers

//   const startTime = Date.now();

//   // Notify clients to start the timer
//   io.emit('startTimer');

//   // Timer logic
//   timerInterval = setInterval(() => {
//     const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert milliseconds to seconds
//     if (elapsedTime >= timerDuration) {
//       // Time is up, trigger game over
//       io.emit('timerExpired');
//       stopTimer(); // Clear the interval when the timer expires
//     }
//   }, 1000);
// }

// function stopTimer() {
//   clearInterval(timerInterval);
//   io.emit('stopTimer');
// }


io.on('connection', (socket) => {
  
   socket.on('startAdventure', (choice)=>{
    gameState.bChoice = choice;
    scene2intro();
   });

   socket.on('pathOptionScene', ()=>{
    scene3pathoption();
    io.emit('displayPathOptions');
  });


//   socket.on('afterTakeoff', () => {
//     startScene25();
//     startTimer();
//   });

  socket.on('pathChoice', (choice) => {
    
    gameState.bChoice = choice;
    if (gameState.bChoice === 'path-option-1') {
      scene4asteroid();
    } else if (gameState.bChoice === 'path-option-2') {
      scenelost();
    }

  });

  socket.on('attackOptionScene', ()=>{
    scene5attackoption();
    io.emit('displayAttackOptions');
  });
  
  socket.on('attackChoice', (choice) => {
    
    gameState.bChoice = choice;
    if (gameState.bChoice === 'attack-option-1') {
      scene6cloud();
    } else if (gameState.bChoice === 'attack-option-2') {
      scenelost();
    }

  });

  socket.on('codeOptionScene', ()=>{
    scene7codeoption();
    io.emit('displayCodeOptions');
  });



//   socket.on('afterPath', () => {
//     startScene35();
//     startTimer();
//   });

//   socket.on('afterAttack', () => {
//     startScene45();
//     startTimer();
//   });

//   socket.on('attackChoice', (choice) => {
//     gameState.bChoice = choice;

//     if (gameState.bChoice === 'b-option-1') {
//       stopTimer();
//       startScene4();
//     } else if (gameState.bChoice === 'b-option-2') {
//       stopTimer();
//       startScene6();
//     }
//   });

//   socket.on('codeChoice', (choice) => {
//     gameState.bChoice = choice;
//     if (gameState.bChoice === 'c-option-1') {
//       stopTimer();
//       startScene5();
//     } else if (gameState.bChoice === 'c-option-2' || gameState.bChoice === 'c-option-3') {
//       stopTimer();
//       startScene6();
//     }
//   });

//   socket.on('afterCode', () => {
//     startScene54();
//     //startTimer();
//   });

//   socket.on('doyouwanna', () => {
//     doyouwanna();
//     //startTimer();
//   });

//   socket.on('startAgain', ()=>{
//     stopTimer();
//     startAgain();
//   });
  
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
