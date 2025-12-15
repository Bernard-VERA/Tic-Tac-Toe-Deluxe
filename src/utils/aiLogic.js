import { checkWinner } from "./gameLogic.js";

//  Fonction simple : choisit une case libre au hasard.
//  Utilisée pour un niveau d'IA classique.
export function randomAIMove(board) {
  const available = [];
  // Recherche toutes les cases vides du plateau
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        available.push([i, j]);
      }
    }
  }
  // Si aucune case libre → pas de coup possible
  if (available.length === 0) return null;
  // Choisit une case au hasard
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

// Fonction avec l'algorithme MINIMAX
// Choisit le meilleur coup possible en simulant tous les coups jouables jusqu'à la fin.
export function minimaxMove(board, aiPlayer = "O", humanPlayer = "X") {
  let bestScore = -Infinity;
  let move = null;

  // Parcourt toutes les cases du plateau
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        // Simule tous les coups par l'IA
        board[i][j] = aiPlayer;
        // Évalue ces coups avec Minimax
        const score = minimax(board, 0, false, aiPlayer, humanPlayer);
        // Annule les coups (backtracking)
        board[i][j] = null;
        // Garde le meilleur coup trouvé
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }
    }
  }
  return move;
}

// FONCTION RÉCURSIVE MINIMAX
// Explore toutes les possibilités jusqu'à la fin de la partie.
//    - isMaximizing = true  -> tour de l'IA (maximise le score)
//    - isMaximizing = false -> tour du joueur humain (minimise le score)
// Le score dépend du résultat :
//    IA gagne    -> 10 - profondeur
//    Humain gagne -> profondeur - 10
//    Égalité      -> 0
function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
  const result = checkWinner(board);
  if (result !== null) {
    if (result === aiPlayer) return 10 - depth;
    if (result === humanPlayer) return depth - 10;
    if (result === "draw") return 0;
  }

  // Tour de l'IA -> maximise le score
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = aiPlayer;  // Simule un coup de l'IA
          const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
          board[i][j] = null;  // Annule le coup
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
    // Tour du joueur humain -> minimise le score
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = humanPlayer;  // Simule un coup humain
          const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
          board[i][j] = null;  // Annule le coup
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
}