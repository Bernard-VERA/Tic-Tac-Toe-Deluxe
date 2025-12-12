import "../index.css"
// Import du composant principal du jeu
import TicTacToe from "../components/TicTacToe.jsx";
import "../components/TicTacToe.css";

export default function Index() {
  return (
    <main>
      <header>
        <h1>
          Tic-Tac-Toe <span style={{ color: "#dc2626" }}>Deluxe</span>
        </h1>
        <p>Choisissez votre niveau</p>
        <p>et affrontez un ami ou l’IA&nbsp;!</p>
      </header>

      <section>
        <TicTacToe />
      </section>

      <footer>
        &copy; {new Date().getFullYear()} – Jeu de tic-tac-toe - Bernard VERA
      </footer>
    </main>
  );
}