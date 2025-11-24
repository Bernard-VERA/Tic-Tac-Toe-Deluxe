import "./TicTacToe.css";

export default function Board({ board, onCellClick, winner, difficulty, currentPlayer }) {
  return (
    <div className="tictactoe-board">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={i + "-" + j}
            className={
              "tictactoe-cell" +
              (cell === "X"
                ? " cell-x"
                : cell === "O"
                ? " cell-o"
                : " cell-empty") +
              (!cell && !winner ? " cell-hover" : "") +
              (cell || winner ? " cell-disabled" : " cell-not-disabled")
            }
            onClick={() => onCellClick(i, j)}
            aria-label={`Case ${i + 1}, ${j + 1}`}
            disabled={
              !!winner ||
              !!cell ||
              (difficulty !== "simple" && currentPlayer === "O")
            }
          >
            {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
          </button>
        ))
      )}
    </div>
  );
}