const { MongoClient } = require("mongodb");

class Database {
  constructor() {
    const { MONGO_URI } = process.env;
    this.client = new MongoClient(MONGO_URI);
    this.db = null;
  }

  async connectDB() {
    if (!this.db) {
      try {
        await this.client.connect();
        this.db = this.client.db(); // el nombre de la DB ya está en la URI
        console.log("✅ Conectado a MongoDB Atlas");
      } catch (error) {
        console.error("❌ Error conectando a MongoDB Atlas:", error);
        throw error;
      }
    }
    return this.db;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("🔌 Conexión a MongoDB Atlas cerrada");
    }
  }
}

module.exports = Database;
