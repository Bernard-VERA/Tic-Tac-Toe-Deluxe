import "./TicTacToe.css";

// Composant Board : affiche la grille du jeu
// On génère un bouton pour chaque case du tableau "board"
// Chaque case reçoit une classe selon son contenu (X, O ou vide)
// On désactive les cases si :
// - la partie est terminée
// - la case est déjà jouée
// - en mode IA, si c'est au tour de l'IA (joueur O)
export default function Board({ board, onCellClick, winner, difficulty, currentPlayer }) {
  return (
    <div className="tictactoe-board">
      {board.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={i + "-" + j}
            // Classes CSS dynamiques selon l'état de la case
            // Case jouée par qui (X, O, ou case vide)
            // On crée un effet de hover si la case est jouable
            // Si elle n'est plus jouable, la case est désactivée
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
            // Au clic sur une case
            // On fixe les conditions de désactivation du bouton
            onClick={() => onCellClick(i, j)}
             // Accessibilité : annonce la position de la case
            aria-label={`Case ${i + 1}, ${j + 1}`}
            disabled={
              !!winner ||
              !!cell ||
              (difficulty !== "simple" && currentPlayer === "O")
            }
          >
            {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""} 
          </button> // Affichage du symbole dans la case
        ))
      )}
    </div>
  );
}
// Le aria-label permet aux lecteurs d'écran d'annoncer la case
// i = numéro de la ligne (0, 1, 2), j = numéro de la colonne (0, 1, 2)
//un lecteur d’écran annoncera :
//"Case 1, 1" pour la première case
//"Case 2, 3" pour la case ligne 2, colonne 3