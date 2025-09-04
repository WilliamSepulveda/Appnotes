import { useState, useEffect } from "react";

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...note, title, content });
  };

  return (
    <div className="note-editor">
      <h2>{note.id ? "Editar Nota" : "Nueva Nota"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="editor-actions">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
