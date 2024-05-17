import React from 'react';
import Tetris from '@/Tetris';
import '@/index.css';




function Tetris_Game() {
  return (
    <React.StrictMode>
    <Tetris />
  </React.StrictMode>
  )
}

export default Tetris_Game

import '@/index.css'; // Import the CSS file
/*
    <div>
      <img src="resources/logo.png" id='logo'/>
    <div id="wrapper">
                
              
                <div id="score-div">
                    <label>Score:</label>
                    <label id="score"></label>
              
                <div id="lines-div">
                    <label>Lines:</label>
                    <label id="lines"></label>
                </div>
            </div>
            <div id="game-container">
                <img src="resources/background.png" id="background" />
                <canvas id="game-canvas" />
            </div>
        </div>
        </div>

*/