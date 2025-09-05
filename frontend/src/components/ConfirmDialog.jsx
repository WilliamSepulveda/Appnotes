import "../styles/ConfirmDialog.css";

export default function ConfirmDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>¿Quieres eliminar esta nota?</p>
        <div className="modal-actions">
          <button className="discard" onClick={onClose}>Cancelar</button>
          <button className="save" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
