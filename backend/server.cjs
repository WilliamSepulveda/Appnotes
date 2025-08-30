require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter.cjs');
const noteRouter = require('./routes/noteRouter.cjs');

const app = express();

// Middlewares
// Middlewares
const allowedOrigins = [
  "http://localhost:5173",   // frontend en desarrollo
  "https://tu-frontend.vercel.app" // (cuando subas tu frontend)
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir llamadas sin origin (como Postman) o desde lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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