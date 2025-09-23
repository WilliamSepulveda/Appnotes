import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NoteEditor.css";

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`http://localhost:5000/api/notes`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
      });

      if (!res.ok) throw new Error("Error al guardar la nota");

      setShowConfirm(false);
      navigate("/notas");
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="editor-screen">
      <header className="editor-header">
        <button className="back-btn" onClick={() => navigate("/notas")}>←</button>
        <h2>Nueva Nota</h2>
      </header>

      <form onSubmit={handleSubmit} className="editor-form">
        <input
          className="editor-title"
          type="text"
          placeholder="Título de la nota"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="editor-content"
          placeholder="Escribe tu contenido aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="editor-actions">
          <button type="submit" className="btn-save-main">Guardar</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/notas")}>Cancelar</button>
        </div>
      </form>

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>¿Guardar la nueva nota?</p>
            <div className="modal-actions">
              <button className="btn-discard" onClick={() => setShowConfirm(false)}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNote;
