import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import NoteCard from "../components/NoteCard";
import Header from "../components/Header";
import "../styles/Note.css";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setNotes(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleSearch = (query) => {
    if (!query) return setFiltered(notes);
    const lower = query.toLowerCase();
    setFiltered(notes.filter((n) => n.title.toLowerCase().includes(lower)));
  };

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Error al eliminar la nota");

    // ✅ Si el backend confirma, borramos del estado
    setNotes((prev) => prev.filter((n) => n._id !== id));
    setFiltered((prev) => prev.filter((n) => n._id !== id));
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};


  const handleNoteClick = (id) => {
      navigate(`/note-editor/${id}`);

  };

  const handleFabClick = () => {
    navigate("/create-note");
  };

  return (
    <div className="screen">
      <Header onSearch={handleSearch} />

      {filtered.length === 0 ? (
  <EmptyState message="No se encontraron notas con ese título." />
) : (
  <div className="notes-list">
    {filtered.map((n, index) => (
      <NoteCard
        key={n._id}
        note={n}
        onEdit={() => handleNoteClick(n._id)}
        onDelete={() => handleDelete(n._id)}
        color={colors[index % colors.length]}
      />
    ))}
  </div>
)}


      <button className="fab" onClick={handleFabClick}>+</button>
    </div>
  );
};

export default Note;
