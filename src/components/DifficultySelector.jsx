import "./TicTacToe.css";

const DIFFICULTIES = [
  { label: "Simple", value: "simple", subtitle: "2 joueurs" },
  { label: "Moyen", value: "moyen", subtitle: "IA classique" },
  { label: "Pro", value: "pro", subtitle: "IA imbattable" },
];

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