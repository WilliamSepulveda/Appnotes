import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notas from "./pages/Note.jsx";
import NoteEditor from "./Components/NoteEditor.jsx";
import CreateNota from "./pages/CreateNota.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create-note" element={< CreateNota/>} />
        <Route path="/notas" element={< Notas/>} />
        <Route path="/note-editor/:id" element={< NoteEditor />}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
