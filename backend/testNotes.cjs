require('dotenv').config();
const Notes = require('./models/notesModel.cjs');

async function test() {
  const notesModel = new Notes();

  // Copia el _id del usuario que creaste en testUser.cjs
  const userId = '68b134b0ac1269b90b414c9e';

  try {
    // 1️⃣ Crear nota
    const create = await notesModel.createNote(userId, 'Mi primera nota', 'Contenido de prueba');
    console.log('Nota creada con ID:', create.insertedId);

    // 2️⃣ Obtener todas las notas del usuario
    const allNotes = await notesModel.getNotes(userId);
    console.log('Todas las notas:', allNotes);

    // 3️⃣ Obtener nota por ID
    const note = await notesModel.getNoteById(create.insertedId);
    console.log('Nota por ID:', note);

    // 4️⃣ Actualizar nota
    await notesModel.updateNote(create.insertedId, 'Nota editada', 'Contenido editado');
    console.log('Nota actualizada');

    // 5️⃣ Obtener nota actualizada para verificar
    const updatedNote = await notesModel.getNoteById(create.insertedId);
    console.log('Nota después de actualizar:', updatedNote);

    // 6️⃣ Eliminar nota
    await notesModel.deleteNote(create.insertedId);
    console.log('Nota eliminada');

    // 7️⃣ Verificar eliminación
    const afterDelete = await notesModel.getNotes(userId);
    console.log('Notas después de eliminar:', afterDelete);

  } catch (error) {
    console.error('Error CRUD notas:', error.message);
  }
}

test();
