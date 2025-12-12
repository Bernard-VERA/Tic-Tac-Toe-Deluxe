import { Routes, Route } from "react-router-dom";
// Import des composants de routing de React Router
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";

// Composant principal de l'application
// Déclaration des routes de l'application
const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Toute autre route => 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
