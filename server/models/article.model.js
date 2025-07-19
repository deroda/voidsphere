// server/models/article.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  publicationDate: { type: Date, default: Date.now },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;