  const express = require('express');
  const router = express.Router();
  const authMiddleware = require('../middleware/authMiddleware.cjs');
  const {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
  } = require('../controllers/note.controller.cjs');

  router.use(authMiddleware);

  router.post('/', createNote);
  router.get('/:idOrTitle',getNote);
  router.get('/', getNotes);
  router.put('/:id', updateNote);
  router.delete('/:id', deleteNote);

  module.exports = router;
