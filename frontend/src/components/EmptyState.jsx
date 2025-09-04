import imagenEmptyState from "../media/rafiki.png";
import "../styles/EmptyState.css";

export default function EmptyState() {
  return (
    <div className="empty">
      <img src={imagenEmptyState} alt="imagenEmptyState" />
      <p className="empty-text">Create your first note !</p>
    </div>
    );
}
