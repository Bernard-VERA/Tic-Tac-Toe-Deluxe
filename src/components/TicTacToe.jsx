import { useState, useEffect } from "react";
import "./TicTacToe.css";
import Board from "./Board.jsx";
import DifficultySelector from "./DifficultySelector.jsx";
import GameStatus from "./GameStatus.jsx";
import { checkWinner } from "../utils/gameLogic.js";
import { randomAIMove, minimaxMove } from "../utils/aiLogic.js";

const emptyBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState("simple"); // simple | moyen | pro
  const [isAITurn, setIsAITurn] = useState(false);

  const handleRestart = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setIsAITurn(false);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    handleRestart();
  };

  const handleCellClick = (row, col) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      return;
    }

    if (difficulty === "simple") {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    } else {
      setIsAITurn(true);
    }
  };

  // Tour de l’IA
  useEffect(() => {
    if (!isAITurn || winner || difficulty === "simple") return;

    const timeout = setTimeout(() => {
      const aiMove =
        difficulty === "moyen"
          ? randomAIMove(board)
          : minimaxMove(board, "O", "X");

      if (!aiMove) {
        setIsAITurn(false);
        return;
      }

      const [i, j] = aiMove;
      const newBoard = board.map((r) => [...r]);
      if (!newBoard[i][j]) {
        newBoard[i][j] = "O";
        setBoard(newBoard);
      }

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
      } else {
        setCurrentPlayer("X");
      }
      setIsAITurn(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isAITurn, winner, difficulty, board]);

  // Quand c’est à l’IA de jouer (après un coup humain)
  useEffect(() => {
    if (difficulty !== "simple" && currentPlayer === "O" && !winner) {
      setIsAITurn(true);
    }
  }, [currentPlayer, difficulty, winner]);

  return (
    <div className="tictactoe-root">
      <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
      <GameStatus
        currentPlayer={currentPlayer}
        winner={winner}
        onRestart={handleRestart}
        isAITurn={isAITurn}
        difficulty={difficulty}
      />
      <Board
        board={board}
        onCellClick={handleCellClick}
        winner={winner}
        difficulty={difficulty}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}