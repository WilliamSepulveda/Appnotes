// NoteCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importa navigate
import "../styles/NoteCard.css";
import edit from "../media/mode.png";
import del from "../media/delete.png";
import ConfirmDialog from "./ConfirmDialog";

export default function NoteCard({ note, onEdit, onDelete, color }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = () => {
    onDelete(note._id);
    setOpenConfirm(false);
  };

  const handleCancel = () => {
    setOpenConfirm(false);
    console.log();
    ("Acción cancelada");
    navigate("/notas"); // 👈 redirige al listado de notas
  };

  return (
    <>
      <div className="note-card" style={{ backgroundColor: color }}>
        <div className="content_data">
          <h3>{note.title}</h3>
          <p>
            {note.content.length > 50
              ? note.content.substring(0, 50) + "..."
              : note.content}
          </p>
        </div>
        <div className="actions">
          <img src={edit} onClick={() => onEdit(note._id)} className="edit" />
          <img src={del} onClick={() => setOpenConfirm(true)} className="delete" />
        </div>
      </div>

      <ConfirmDialog
        isOpen={openConfirm}
        onClose={handleCancel} 
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
