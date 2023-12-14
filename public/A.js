
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const gameVideo = document.getElementById('game-video');
    const smallTextElement = document.getElementById('a-small-text');
    const overlay = document.getElementById('overlay');

    const socket = io.connect();

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
        smallTextElement.textContent = 'Choose the path.\n Noahs superpower will guide you (Hint: IPDL Lab)';
        gameVideo.play();
        overlay.style.display = 'block';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.700)';  
    }

     /*else if (gameState.scene === 2.5) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/zbs9sfdbd3qx16s1zt7a3/Launch-Paused.mp4?rlkey=6g8mfzly98bevcji8q2wu875n&raw=1';
        smallTextElement.textContent = 'Choose the path. Noahs superpower will guide you (Hint:IPDL Lab)';
        gameVideo.play();
        gameVideo.loop = "true";
        // Trigger the video to start playing
    } else if (gameState.scene === 3) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/36j2t2rygxzzgsyonjkgf/Part1Launch.mp4?rlkey=u6js6x8j3y1ykgq7ncqem79zb&raw=1';
        smallTextElement.textContent = '';
        gameVideo.play();
        // Trigger the video to start playing
    } else if (gameState.scene === 3.5) {
        // Change the video source for scene 3
        gameVideo.src = 'https://www.dropbox.com/scl/fi/q8ca8yipg6z5ij251ue8a/AsteroidPaused.mp4?rlkey=r10redevptl9dch8ia10zp0s5&raw=1';
        smallTextElement.textContent = 'Mannequins left heel will help you with your plan of action';
        gameVideo.play();

        // Trigger the video to start playing
    } else if (gameState.scene === 4) {
        // Change the video source for scene 4
        gameVideo.src = 'https://www.dropbox.com/scl/fi/iektn0u2etx3d43zykhe4/Part2CloudRunNew.mp4?rlkey=k1xw10n16v2cw0senqhxx46j5&raw=1';
        smallTextElement.textContent = ''
        gameVideo.play();
        ;
    } else if (gameState.scene === 4.5) {
        // Change the video source for scene 4
        gameVideo.src = 'https://www.dropbox.com/scl/fi/e8lybh75q3jm0mqtxuf9j/Cloud-Paused.mp4?rlkey=tltiqs6tgp9peql13oo89dtqj&raw=1';
        smallTextElement.textContent = 'You are close to finishing your mission...Look out the window next to the palm tree'
        gameVideo.play();
        ;
    } else if (gameState.scene === 5) {
        // Change the video source for scene 5
        gameVideo.src = 'https://www.dropbox.com/scl/fi/7rcrb1wxard34ie1l8sds/Part3CargoGrab-1.mp4?rlkey=b5aw4in7jlzfwy83aiftmy5dl&raw=1';
        smallTextElement.textContent = ''
        gameVideo.play();
        ;
    }else if (gameState.scene === 5.4) {
        // Victory Scene
        gameVideo.src = 'https://www.dropbox.com/scl/fi/k0wm5gv16h8bsc8cvpddf/Part4Victory-1.mp4?rlkey=c708o6o8115lm7stnebtzb2q1&raw=1';
        smallTextElement.textContent = 'Congratulations you have got the cargo. You can go home..... '
        gameVideo.play();
        ;
    } else if (gameState.scene === 5.5) {
        // Change the video source for scene 5
        gameVideo.src = 'https://www.dropbox.com/scl/fi/n1subrdll63tqj92qhcws/startScreen.mp4?rlkey=mxpb3dtnzbvqqgo1crw5nbu6u&raw=1';
        smallTextElement.textContent = 'You can start again....'
        gameVideo.play();
        ;
    } else if (gameState.scene === 6) {
        // Change the video source for scene 6        
        gameVideo.src = 'https://www.dropbox.com/scl/fi/pcsqwgrmueep87sxrc338/Lost.mp4?rlkey=00rn0inzc8pz7sfzj1gazqotm&raw=1';
        smallTextElement.textContent = 'Oh no you have lost...'
        gameVideo.play();
        ;
    } */
    });


});

  