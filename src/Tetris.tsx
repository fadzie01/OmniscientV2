import Board from './components/Board';
import UpcomingBlocks from './components/UpcomingBlocks';
import { useTetris } from './hooks/useTetris';
import { Button } from "@/components/ui/button";

function Tetris() {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();

  return (
    <div className="sm:w-520 flex-center flex-col"><img src="resources/logo.png" id="logo" />
    <div className="app">
      
    <Board currentBoard={board} />
      <div className="controls">
                <div id="score-div">
                    <label>Score:{score} </label>
                    <label id="score"></label>
                </div>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        ) : (
          <Button 
          
          className="shad-button_primary" onClick={startGame}>New Game</Button>
        )}
      </div>
    </div>
    </div>
  );
}

export default Tetris;
