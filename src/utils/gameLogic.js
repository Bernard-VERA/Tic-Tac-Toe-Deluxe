export function checkWinner(board) {
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

  for (const line of lines) {
    const [a, b, c] = line;
    const v1 = board[a[0]][a[1]];
    const v2 = board[b[0]][b[1]];
    const v3 = board[c[0]][c[1]];
    if (v1 && v1 === v2 && v2 === v3) {
      return v1; // "X" ou "O"
    }
  }

  // Vérif égalité
  const isDraw = board.every(row => row.every(cell => cell));
  if (isDraw) return "draw";

  return null;
}