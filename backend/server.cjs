require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter.cjs');
const noteRouter = require('./routes/noteRouter.cjs');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

// Ruta de prueba
app.get('/', (req, res) => res.send('Backend de AppNotes funcionando'));

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));


module.exports = app; 