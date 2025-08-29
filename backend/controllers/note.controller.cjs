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
    const result = await notes.getNotes(req.user.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo notas' });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const notes = new Notes();
    const note = await notes.getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo nota' });
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
