import React, { useEffect, useState } from "react";
import Board from "../Board";
import LeaderBoard from "../LeaderBoard";


/**
 * A game of tic-tac-toe.
 */

const Game = () => {
  const [gameHistory, setGameHistory] = useState([{ squares: Array(9).fill(null) }]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [leaderBoard, setLeaderBoard] = useState([]);

  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const [updatedPlayerName, setUpdatedPlayerName] = useState('');
  const [playerOName, setPlayerOName] = useState('');
  const [playerXName, setPlayerXName] = useState('');


  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };


  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  // Logic to calculate the score

  useEffect(() => {
    if (winner) {
      if (winner === playerOName) {
        setPlayerOScore(playerOScore + 1)
      }
      if (winner === playerXName) {
        setPlayerXScore(playerXScore + 1)
      }
    }
  }, [winner])

  // Adding winner to leader board array

  useEffect(() => {
    if (winner) setLeaderBoard([...leaderBoard, { roundWinner: winner }])
  }, [winner])


  const handleClick = (i, winner) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);
  };


  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };


  const moves = gameHistory.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });


  let status;
  if (winner) {
    status = "Winner: " + winner;

    // Below Logic compares the two last game histories to identify which move was final. Then a class is applied to the square that matches the number of the final move. 

    const finalGameHistory = gameHistory[gameHistory.length - 1].squares;
    const preFinalGameHistory = gameHistory[gameHistory.length - 2].squares;

    const findFinalMove = (arr1, arr2) => {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return [i, arr1[i]];
      }
    }

    const [finalMoveNumber] = findFinalMove(finalGameHistory, preFinalGameHistory);
    const buttons = Array.from(document.querySelectorAll('.square'));
    buttons[finalMoveNumber].classList.add('winning-move');
    setTimeout(() => { buttons[finalMoveNumber].classList.remove('winning-move') }, 2000);

  } else {
    status = "Next player: " + (xIsNext ? playerXName : playerOName);
  }


  const handleNameChange = (e) => {
    setUpdatedPlayerName(e.target.value);
  };

  const handlePlayerOChange = (e) => {
    setPlayerOName(updatedPlayerName);
  };

  const handlePlayerXChange = (e) => {
    setPlayerXName(updatedPlayerName);
  };


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i, winner)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="additional-game-details">
        <div className="score-board">
          <p>{`(O) ${playerOName}`} Score: {playerOScore}</p>
          <p>{`(X) ${playerXName}`} Score: {playerXScore}</p>
        </div>
        <div className="name-change-board">
          <input type="text" onChange={handleNameChange}></input>
          <button onClick={handlePlayerOChange}>Update Player O Name</button>
          <button onClick={handlePlayerXChange}>Update Player X Name</button>
        </div>
        <LeaderBoard leaderBoard={leaderBoard} />
      </div>
    </div>
  );
};

export default Game;