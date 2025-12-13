import "./TicTacToe.css";

// Liste des niveaux de difficulté disponibles pour le jeu
// Chaque entrée contient :
// - label : texte affiché sur le bouton
// - value : valeur interne utilisée par le jeu
// - subtitle : description courte affichée sous le label
const DIFFICULTIES = [
  { label: "Simple", value: "simple", subtitle: "2 joueurs" },
  { label: "Moyen", value: "moyen", subtitle: "IA classique" },
  { label: "Pro", value: "pro", subtitle: "IA imbattable" },
];

// Composant permettant de sélectionner la difficulté du jeu
// On génère un bouton pour chaque difficulté
// On ajoute la classe "selected" au bouton choisi
// Au clic, on transmet la valeur de la difficulté choisie au parent
export default function DifficultySelector({ value, onChange }) {
  return (
    <div className="tictactoe-difficulty-selector">
      {DIFFICULTIES.map((diff) => (
        <button
          key={diff.value}
          className={
            "difficulty-btn" + (value === diff.value ? " selected" : "")
          }
          onClick={() => onChange(diff.value)}
        >
          <span className="difficulty-label">{diff.label}</span>
          <span className="difficulty-subtitle">{diff.subtitle}</span>
        </button>
      ))}
    </div>
  );
}