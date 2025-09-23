import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/NoteEditor.css";

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        console.error("Error al obtener la nota:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNote();
    else setLoading(false);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5000/api/notes/${id}`
        : `http://localhost:5000/api/notes`;

      const res = await fetch(url, {
        method,
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

  if (loading) return <p className="loading">Cargando...</p>;

  return (
    <div className="editor-screen">
      <header className="editor-header">
        <button className="back-btn" onClick={() => navigate("/Notas")}>←</button>
        <h2>{id ? "Editar Nota" : "Nueva Nota"}</h2>
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

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Save changes?</p>
            <div className="modal-actions">
              <button className="btn-discard" onClick={() => setShowConfirm(false)}>
                Discard
              </button>
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
