const Database = require('./db.cjs');
const { ObjectId } = require('mongodb');

class Notes {
  constructor() {
    this.db = new Database();
  }

  async createNote(userId, title, content) {
    const db = await this.db.connectDB();
    return db.collection('notes').insertOne({
      userId,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async getNotes(userId) {
    const db = await this.db.connectDB();
    return db.collection('notes').find({ userId }).toArray();
  }

  async getNoteById(id) {
    const db = await this.db.connectDB();
    return db.collection('notes').findOne({ _id: new ObjectId(id) });
  }

  async updateNote(id, title, content) {
    const db = await this.db.connectDB();
    return db.collection('notes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, updatedAt: new Date() } }
    );
  }

  async deleteNote(id) {
    const db = await this.db.connectDB();
    return db.collection('notes').deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Notes;
