const router = require('express').Router();
let Article = require('../models/article.model');
const auth = require('../middleware/auth'); // <-- 1. IMPORT MIDDLEWARE

// --- Public Routes (Anyone can view articles) ---
router.route('/').get((req, res) => { /* ... */ });
router.route('/:id').get((req, res) => { /* ... */ });
router.route('/category/:categoryName').get((req, res) => { /* ... */ });


// --- Protected Routes (Only logged-in users can modify articles) ---

// Add a new article
router.route('/add').post(auth, (req, res) => { // <-- 2. APPLY MIDDLEWARE
  const { title, author, content, category, imageUrl } = req.body;
  const newArticle = new Article({ title, author, content, category, imageUrl });

  newArticle.save()
    .then(() => res.json('Article added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update an article by ID
router.route('/update/:id').post(auth, (req, res) => { // <-- 2. APPLY MIDDLEWARE
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

// Delete an article by ID
router.route('/:id').delete(auth, (req, res) => { // <-- 2. APPLY MIDDLEWARE
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json('Article deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;