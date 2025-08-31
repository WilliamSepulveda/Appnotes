const { MongoClient } = require("mongodb");

class Database {
  constructor() {
    const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_USER, MONGO_PSW } = process.env;
    
    const uri = `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PSW}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;
    
    this.client = new MongoClient(uri);
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      try {
        await this.client.connect();
        this.db = this.client.db(process.env.MONGO_NAME);
        console.log("✅ Conectado a MongoDB");
      } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error);
        throw error;
      }
    }
    return this.db;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("🔌 Conexión a MongoDB cerrada");
    }
  }
}

module.exports = Database;
