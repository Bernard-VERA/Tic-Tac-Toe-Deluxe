// Cette page d'erreur est autonome, le style css est inclus directement.
import { Link } from "react-router-dom";

const wrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f3f4f6",
};

const cardStyle = {
  textAlign: "center",
};

const codeStyle = {
  fontSize: "4rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const textStyle = {
  fontSize: "1.1rem",
  color: "#4b5563",
  marginBottom: "1rem",
};

const linkStyle = {
  color: "#2563eb",
  textDecoration: "underline",
};

export default function NotFound() {
  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h1 style={codeStyle}>404</h1>
        <p style={textStyle}>Oops ! Page non trouvée</p>
        <Link to="/" style={linkStyle}>
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}