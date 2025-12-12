import React from 'react';
// Import de React (nécessaire pour utiliser JSX)
import ReactDOM from 'react-dom/client';
// Import du moteur de rendu moderne de React
import { BrowserRouter } from "react-router-dom";
// Import du composant BrowserRouter pour activer la navigation
import App from './App.jsx';
import './index.css'

// Point d'entrée de l'application React.
// On sélectionne l'élément <div id="root"> dans index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>,
)
// StrictMode aide à détecter des erreurs et comportements obsolètes en développement
// BrowserRouter permet d'utiliser les routes dans toute l'application