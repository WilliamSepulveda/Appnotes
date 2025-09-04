import "../styles/NoteCard.css";
import edit from "../media/mode.png";
import del from "../media/delete.png";

export default function NoteCard({ note, onEdit, onDelete, color }) {
  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div className="content_data">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      </div>
      <div className="actions">
        <img src={edit} onClick={() => onEdit(note)} className="Editar" />
        <img src={del} onClick={() => onDelete(note)} className="Eliminar" />
      </div>
    </div>
  );
}
