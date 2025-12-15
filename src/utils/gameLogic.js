// Fonction qui analyse l'état du plateau et détermine s'il reste des coups à jouer, où s'il y a un gagnant ou une égalité
export function checkWinner(board) {
  // Liste de toutes les combinaisons gagnantes possibles :
  // 3 lignes, 3 colonnes, 2 diagonales
  const lines = [
    // Lignes
    [ [0, 0], [0, 1], [0, 2] ],
    [ [1, 0], [1, 1], [1, 2] ],
    [ [2, 0], [2, 1], [2, 2] ],
    // Colonnes
    [ [0, 0], [1, 0], [2, 0] ],
    [ [0, 1], [1, 1], [2, 1] ],
    [ [0, 2], [1, 2], [2, 2] ],
    // Diagonales
    [ [0, 0], [1, 1], [2, 2] ],
    [ [0, 2], [1, 1], [2, 0] ],
  ];

  // Parcourt chaque combinaison gagnante
  for (const line of lines) {
    const [a, b, c] = line;
    // Récupère les valeurs des 3 cases concernées
    const v1 = board[a[0]][a[1]];
    const v2 = board[b[0]][b[1]];
    const v3 = board[c[0]][c[1]];
    // Si les 3 cases sont identiques et non vides, on a un gagnant
    if (v1 && v1 === v2 && v2 === v3) {
      return v1; // Retourne "X" ou "O"
    }
  }

  // Vérifie si toutes les cases sont remplies → égalité
  const isDraw = board.every(row => row.every(cell => cell));
  if (isDraw) return "draw";

  // Sinon, la partie continue
  return null;
}

// Principe : On teste toutes les combinaisons gagnantes possibles. Si aucune ne correspond, on vérifie si le plateau est plein.