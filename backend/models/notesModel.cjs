// Notes.cjs
const Database = require('./db.cjs');
const { ObjectId } = require('mongodb');

class Notes {
  constructor() {
    this.dbInstance = new Database(); // guardamos la clase Database
  }

  async createNote(userId, title, content) {
    const db = await this.dbInstance.connectDB(); 
    return db.collection('notes').insertOne({
      userId,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async getNotes(query = {}) {
  const db = await this.dbInstance.connectDB();
  const result = await db.collection('notes').find(query).toArray();
  if (!result.length) throw new Error('No documents found');
  return result;
}


  async getNoteById(id) {
    const db = await this.dbInstance.connectDB();
    return db.collection('notes').findOne({ _id: new ObjectId(id) });
  }

  async updateNote(id, title, content) {
    const db = await this.dbInstance.connectDB();
    return db.collection('notes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, updatedAt: new Date() } }
    );
  }

  async deleteNote(id) {
    const db = await this.dbInstance.connectDB();
    return db.collection('notes').deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Notes;
