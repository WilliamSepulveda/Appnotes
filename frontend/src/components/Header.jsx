import { useState } from "react";
import searchIcon from "../media/search.png";
import closeIcon from "../media/close.png";
import "../styles/Header.css";

export default function Header({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="header-container">
      <header className="header">
        <h1 className="logo">Notas</h1>

        <button className="btn-search" onClick={() => setOpen(!open)}>
          <img src={open ? closeIcon : searchIcon} alt="Buscar" />
        </button>
      </header>

      {/* Input debajo del header */}
      {open && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar notas..."
            value={query}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
