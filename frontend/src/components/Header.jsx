import { useState } from "react";
import "../styles/Header.css";
import search from "../media/search.png";
import info from "../media/info_outline.png";
import close from "../media/close.png";

const SearchNote = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/note/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error buscando nota:", error);
    }
  };

  return (
    <div className="container-dad">
      <h1>Notes</h1>
      <div className="container-buttons">
        <div className="container-search">
          <img src={search} onClick={() => setOpen(true)} className="search" />
        </div>
        <div className="container-info">
          <img src={info} alt="" />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex flex-col justify-start items-center p-4">
          <div className="w-full max-w-md flex items-center bg-gray-800 rounded-lg px-3">
            <input
              type="text"
              placeholder="Search by the keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-transparent text-white px-2 py-2 outline-none"
            />
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 px-2"
            >
              <img src={close} alt="" />
            </button>
          </div>

          {result && (
            <div className="mt-4 bg-gray-900 text-white p-4 rounded-lg w-full max-w-md">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchNote;
