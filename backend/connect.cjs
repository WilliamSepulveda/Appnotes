require('dotenv').config();
const Database = require('./models/db.cjs');

async function test() {
  const db = new Database();
  try {
    await db.connectDB();
    console.log('DB OK');
  } catch (e) {
    console.error('Error DB:', e.message);
  }
}

test();
