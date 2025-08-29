const { MongoClient } = require('mongodb');

class Database {
  constructor() {
    const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_USER, MONGO_PSW } = process.env;
    const uri = `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PSW}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
    this.client = new MongoClient(uri); // <- CORREGIDO
    this.db = null;
  }

  async connectDB() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(process.env.MONGO_NAME);
      console.log('Conexión exitosa a MongoDB');
    }
    return this.db;
  }
}

module.exports = Database;
