require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter.cjs');
const noteRouter = require('./routes/noteRouter.cjs');

const app = express();

// 🔗 Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => {
  console.error("❌ Error conectando a MongoDB:", err.message);
  process.exit(1);
});

// 🌍 Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",  // frontend local
  "https://williamsepulveda.github.io/Appnotes"  // GitHub Pages
];


app.use(cors({
  origin: (origin, callback) => {
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

// 📌 Rutas
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

// 🧪 Ruta de prueba
app.get('/', (req, res) => res.send('Backend de AppNotes funcionando'));

// 🚀 Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));

module.exports = app;
