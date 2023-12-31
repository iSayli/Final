
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const gameVideo = document.getElementById('game-video');
    const smallTextElement = document.getElementById('a-small-text');
    const overlay = document.getElementById('overlay');

    const socket = io.connect('https://final-production-dd09.up.railway.app/');

    socket.on('reloadPage', () => {
        location.reload(true); // Reload the entire page
      });

    socket.on('updateState', (gameState) => {
    if (gameState.scene === 2) {
        // Change the video source for scene 2
        gameVideo.src = 'videos/intro.mp4';
        overlay.style.display = 'none';  
        smallTextElement.textContent = '';
        setTimeout(() => {
            socket.emit('pathOptionScene');
        }, 38000);
    }
    
    else if (gameState.scene === 3) {
        // Change the video source for scene 3
        gameVideo.src = 'videos/intropaused.mp4';
        smallTextElement.textContent = 'Choose the path.\n HyunJoo Ohs superpower will guide you (Hint: IPDL Lab Door)';
        overlay.style.display = 'block';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.700)';  
    }

    else if (gameState.scene === 4) {
        // Change the video source for scene 4
        gameVideo.src = 'videos/asteroid.mp4';
        overlay.style.display = 'none';  
        smallTextElement.textContent = '';
        setTimeout(() => {
            socket.emit('attackOptionScene');
        }, 32000);

    }

    else if (gameState.scene === 5) {
        // Change the video source for scene 5
        gameVideo.src = 'videos/asteroidpaused.mp4';
        smallTextElement.textContent = 'To go further you must know this Human Centered Design Firm....The center of the student job board will help you explore the path (Hint: Second Floor Near the Stairs)';
        overlay.style.display = 'block';
    }

    else if (gameState.scene === 6) {
        // Change the video source for scene 6
        gameVideo.src = 'videos/cloud.mp4';
        overlay.style.display = 'none';  
        smallTextElement.textContent = '';
        setTimeout(() => {
            socket.emit('codeOptionScene');
        }, 15000);

    }

    else if (gameState.scene === 7) {
        // Change the video source for scene 7
        gameVideo.src = 'videos/cloudpaused.mp4';
        smallTextElement.textContent = 'You need to know this code to inflitrate. The majority of objects in the glass case in front of the main stairs will help ';
        overlay.style.display = 'block';
    }

    else if (gameState.scene === 8) {
        // Change the video source for scene 8
        gameVideo.src = 'videos/cargo.mp4';
        overlay.style.display = 'none';  
        smallTextElement.textContent = '';
        setTimeout(() => {
            socket.emit('victoryScene');
        }, 33000);

    }

    else if (gameState.scene === 9) {
        // Change the video source for scene 9
        gameVideo.src = 'videos/victory.mp4';
        overlay.style.display = 'none';  
        smallTextElement.textContent = 'Congratulations! You have won!';
        setTimeout(() => {
            socket.emit('startAgainScene');
        }, 12000);
    }


    else if (gameState.scene === 99) {
        // Change the video source for lost scene       
        gameVideo.src = 'videos/Lost.mp4';
        smallTextElement.textContent = 'Oh no you have lost...';
        setTimeout(() => {
            socket.emit('startAgainScene');
        }, 11000);

    }

    else if (gameState.scene === 100) {
        // Change the video source for start again        
        gameVideo.src = 'videos/startScreen.mp4';
        smallTextElement.textContent = 'Do you want to start again?';
        setTimeout(() => {
            socket.emit('round2startscene');
        }, 20000);
    }
    else if (gameState.scene === 21) {
        // Change the video source for new start        
        gameVideo.src = 'videos/startScreen.mp4';
        smallTextElement.textContent = 'Recruit, we need to steal cargo from the enemy. Do you dare to start this space journey?';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.178)';  
    }else if (gameState.scene === 0) {
        // Change the video source for new start        
        gameVideo.src = 'black.mp4';
        smallTextElement.textContent = 'Your timer has expired.';
        setTimeout(() => {
            socket.emit('aftertimeover');
        }, 5000);
    }
    });

});

  