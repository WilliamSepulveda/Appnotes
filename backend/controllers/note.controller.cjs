const { ObjectId } = require("mongodb");
const Notes = require('../models/notesModel.cjs');

exports.createNote = async (req, res) => {
  try {
    const notes = new Notes();
    const result = await notes.createNote(req.user.id, req.body.title, req.body.content);
    res.status(201).json({ message: 'Nota creada', noteId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando nota' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = new Notes();
    const result = await notes.getNotes({ userId: req.user.id }); // <- ahora sí es un filtro válido
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo notas' });
  }
};


exports.getNote = async (req, res) => {
  try {
    const param = req.params.idOrTitle;
    const notes = new Notes();

    let note;

    // Si el parámetro es un ObjectId válido → busca por ID
    if (ObjectId.isValid(param)) {
      note = await notes.getNoteById(param);
    }

    // Si no encontró nada por ID o el parámetro no era un ObjectId válido → busca por título
    if (!note) {
      note = await notes.getNoteByTitle(param);
    }

    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.json(note);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo nota" });
  }

};


exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await notesModel.getNoteById(id);
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateNote = async (req, res) => {
  try {
    const notes = new Notes();
    await notes.updateNote(req.params.id, req.body.title, req.body.content);
    res.json({ message: 'Nota actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando nota' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const notes = new Notes();
    await notes.deleteNote(req.params.id);
    res.json({ message: 'Nota eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando nota' });
  }
};
