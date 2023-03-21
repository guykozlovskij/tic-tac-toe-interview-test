import React from "react";

const LeaderBoard = ({leaderBoard}) => {
    return (
      <div className="leader-board">
      <h3>Leader Board</h3>
      {
        (
          leaderBoard.map(element =>
              <div key={leaderBoard.indexOf(element) + 1} className="winner-display">
                <p>Round {leaderBoard.indexOf(element) + 1}</p>
                <p>Winner: {element.roundWinner}</p>
              </div>
          )
        )
      }
    </div>
    );
};

export default LeaderBoard;