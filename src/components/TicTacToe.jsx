import { useState, useEffect } from "react";
import "./TicTacToe.css";
// Les 3 composants du jeu
import Board from "./Board.jsx";
import DifficultySelector from "./DifficultySelector.jsx";
import GameStatus from "./GameStatus.jsx";
// Logique du jeu (détection de victoire)
import { checkWinner } from "../utils/gameLogic.js";
// IA : coup aléatoire (moyen) ou Minimax (pro)
import { randomAIMove, minimaxMove } from "../utils/aiLogic.js";

// Fonction utilitaire : crée un plateau vide 3x3
const emptyBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Définition des constantes de base : plateau vide, joueur X, gagnant ou égalité, niveau de difficulté, Tour de l'IA 
export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState("simple"); // simple | moyen | pro
  const [isAITurn, setIsAITurn] = useState(false);

  // Réinitialise complètement la partie
  const handleRestart = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setIsAITurn(false);
  };

   // Un changement de difficulté → redémarre la partie
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    handleRestart();
  };

  // Gestion du clic sur une case du plateau
  const handleCellClick = (row, col) => {
    if (winner || board[row][col]) return;
    // Si la partie est finie ou la case déjà occupée → on ignore

    // Copie du plateau pour éviter les mutations directes
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Vérifie si ce coup donne un gagnant
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      return;
    }

    // Mode simple : l’IA ne joue pas, on alterne juste X ↔ O
    if (difficulty === "simple") {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    } else {
      setIsAITurn(true);
    }
  };// Sinon, on déclenche le tour de l’IA

  // Tour de l’IA
  // Conditions pour que l’IA joue
  useEffect(() => {
    if (!isAITurn || winner || difficulty === "simple") return;

     // Petit délai pour rendre l’IA plus "humaine"
     // Puis choix du coup selon la difficulté
    const timeout = setTimeout(() => {
      const aiMove =
        difficulty === "moyen"
          ? randomAIMove(board)
          : minimaxMove(board, "O", "X");

      // Si aucun coup possible (plateau plein)
      if (!aiMove) {
        setIsAITurn(false);
        return;
      }

      const [i, j] = aiMove;
      // Copie du plateau et placement du coup IA
      const newBoard = board.map((r) => [...r]);
      if (!newBoard[i][j]) {
        newBoard[i][j] = "O";
        setBoard(newBoard);
      }

      // Vérifie si l’IA gagne
      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
      } else {
        setCurrentPlayer("X"); // Sinon, retour au joueur humain
      }
      setIsAITurn(false);
    }, 500);

    // Nettoyage du timeout si le composant se démonte
    return () => clearTimeout(timeout);
  }, [isAITurn, winner, difficulty, board]);

  // Quand c’est à l’IA de jouer (après un coup humain)
  // Si on n’est pas en mode simple et que c’est au tour de O
  useEffect(() => {
    if (difficulty !== "simple" && currentPlayer === "O" && !winner) {
      setIsAITurn(true);
    }
  }, [currentPlayer, difficulty, winner]);

  // Affichage du niveau de difficulté
  // Affichage du statut du jeu (tour, gagnant, bouton restart)
  // Affichage du plateau de jeu
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