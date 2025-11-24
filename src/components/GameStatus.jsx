import "./TicTacToe.css";

export default function GameStatus({
  currentPlayer,
  winner,
  onRestart,
  isAITurn,
  difficulty,
}) {
  let status = null;

  if (winner === "draw") {
    status = <span className="tictactoe-status-draw">Égalité 🤝</span>;
  } else if (winner) {
    status = (
      <span className="tictactoe-status-winner">
        Victoire : {winner === "X" ? "❌" : "⭕"} !
      </span>
    );
  } else if (difficulty !== "simple" && isAITurn) {
    status = <span className="tictactoe-status-ia">Tour de l’IA...</span>;
  } else {
    status = (
      <span>
        Au tour de&nbsp;
        <span
          className={
            currentPlayer === "X"
              ? "tictactoe-status-player-x"
              : "tictactoe-status-player-o"
          }
        >
          {currentPlayer === "X" ? "❌" : "⭕"}
        </span>
      </span>
    );
  }

  return (
    <div className="tictactoe-status-container">
      <div className="tictactoe-status">{status}</div>
      <button onClick={onRestart} className="tictactoe-restart-btn">
        Nouvelle partie
      </button>
    </div>
  );
}