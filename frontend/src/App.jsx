import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notas from "./pages/Note.jsx";
function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/notas">Notas</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Inicio 🚀</h1>} />
        <Route path="/notas" element={< Notas/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
