const router = require('express').Router();
let Article = require('../models/article.model');

// Route to get all articles
router.route('/').get((req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new article
router.route('/add').post((req, res) => {
  const { title, author, content, category, imageUrl } = req.body;
  const newArticle = new Article({ title, author, content, category, imageUrl });

  newArticle.save()
    .then(() => res.json('Article added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to get a single article by ID
router.route('/:id').get((req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ... (your existing routes for /, /add, and /:id)

// --- ADD THIS NEW ROUTE ---
// Route to get articles by category
router.route('/category/:categoryName').get((req, res) => {
  // The 'i' flag makes the search case-insensitive (e.g., "Technology" or "technology")
  Article.find({ category: new RegExp(req.params.categoryName, 'i') })
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error: ' + err));
});


// server/routes/articles.js

// ... (keep the existing .get and .post routes)

// Find the route that looks like this:
router.route('/:id').get((req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- ADD THIS NEW ROUTE ---
// Route to delete an article by ID
router.route('/:id').delete((req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json('Article deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- ADD THIS NEW ROUTE ---
// Route to update an article by ID
router.route('/update/:id').post((req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      article.title = req.body.title;
      article.author = req.body.author;
      article.content = req.body.content;
      article.category = req.body.category;
      article.imageUrl = req.body.imageUrl;

      article.save()
        .then(() => res.json('Article updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;