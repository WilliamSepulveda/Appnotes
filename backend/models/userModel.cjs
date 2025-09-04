const Database = require('./db.cjs');
const bcrypt = require('bcrypt');

class User {
  constructor() {
    this.db = new Database();
  }

  async createUser(email, password, name) {
    const db = await this.db.connectDB();
    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ email, password: hashed, name });
    return result;
  }

  async findByEmail(email) {
    const db = await this.db.connectDB();
    return db.collection('users').findOne({ email });
  }
}

module.exports = User; // <- Esto es crucial