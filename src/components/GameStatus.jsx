import "./TicTacToe.css";

// Composant GameStatus : affiche l'état actuel de la partie
export default function GameStatus({
  currentPlayer, // Indique le joueur dont c'est le tour ("X" ou "O")
  winner,        // Indique le gagnant ("X", "O") ou "draw" en cas d'égalité
  onRestart,     // Fonction déclenchée lorsqu'on clique sur "Nouvelle partie"
  isAITurn,      // Indique si c'est au tour de l'IA
  difficulty,    // Indique le niveau de difficulté sélectionné
}) {
  let status = null; // Contiendra le message affiché à l'écran
  //  la partie se termine par une égalité
  // ou sinon, un joueur à gagné (X ou O)
  if (winner === "draw") {
    status = <span className="tictactoe-status-draw">Égalité 🤝</span>;
  } else if (winner) {
    status = (
      <span className="tictactoe-status-winner">
        Victoire : {winner === "X" ? "❌" : "⭕"} !
      </span>
    );
    // mode IA (pas "simple") et c'est à l'IA de jouer
  } else if (difficulty !== "simple" && isAITurn) {
    status = <span className="tictactoe-status-ia">Tour de l’IA...</span>;
  } else { // Sinon, affichage du joueur courant
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
  // Affichage final du message d'état
  // le tabindex permet la navigation au clavier
  return (
    <div className="tictactoe-status-container">
      <div className="tictactoe-status">{status}</div>
      <button onClick={onRestart} className="tictactoe-restart-btn" tabIndex="0">
        Nouvelle partie
      </button>
    </div>
  );
}