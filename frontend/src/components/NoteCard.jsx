import { useState } from "react";
import "../styles/NoteCard.css";
import edit from "../media/mode.png";
import del from "../media/delete.png";
import ConfirmDialog from "./ConfirmDialog";

export default function NoteCard({ note, onEdit, onDelete, color }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(note); 
    setOpenConfirm(false);
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
          <img src={edit} onClick={() => onEdit(note)} className="edit" />
          <img src={del} onClick={() => setOpenConfirm(true)} className="delete" />
        </div>
      </div>

      <ConfirmDialog
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
