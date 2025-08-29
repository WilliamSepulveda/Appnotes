import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/notas">Notas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Inicio 🚀</h1>} />
        <Route path="/notas" element={<h1>Página de notas 📒</h1>} />
      </Routes>
    </div>
  );
}

export default App;
