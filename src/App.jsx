import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";

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
