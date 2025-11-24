import { checkWinner } from "./gameLogic.js";

export function randomAIMove(board) {
  const available = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        available.push([i, j]);
      }
    }
  }
  if (available.length === 0) return null;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

export function minimaxMove(board, aiPlayer = "O", humanPlayer = "X") {
  let bestScore = -Infinity;
  let move = null;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = aiPlayer;
        const score = minimax(board, 0, false, aiPlayer, humanPlayer);
        board[i][j] = null;
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
  const result = checkWinner(board);
  if (result !== null) {
    if (result === aiPlayer) return 10 - depth;
    if (result === humanPlayer) return depth - 10;
    if (result === "draw") return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = aiPlayer;
          const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
          board[i][j] = null;
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = humanPlayer;
          const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
          board[i][j] = null;
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
}