// Generated with IBM Granite
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  pages: { type: Number, required: true },
  currentPage: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Unread', 'Reading', 'Finished'],
    default: 'Unread'
  },
  cover_url: { type: String, required: false, },
  cover_public_id: { type: String, required: false, },
  shelf: { type: String }, 
  notes: { type: String },
  reminder: { type: Date },
  genre: [{ type: String }],
  rating: { type: Number, min: 1, max: 5 },
  isShared: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
