const router = require('express').Router();
let Article = require('../models/article.model');
let User = require('../models/user.model');
const auth = require('../middleware/auth');

// --- Public Routes (Anyone can view articles) ---

// Get all articles
router.route('/').get((req, res) => {
  Article.find()
    .sort({ createdAt: -1 }) // Sort by newest first
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a single article by ID
router.route('/:id').get((req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get articles by category
router.route('/category/:categoryName').get((req, res) => {
  // The 'i' flag makes the search case-insensitive
  Article.find({ category: new RegExp(req.params.categoryName, 'i') })
    .then(articles => res.json(articles))
    .catch(err => res.status(400).json('Error: ' + err));
});


// --- Protected Routes (Only logged-in users can modify articles) ---

// Add a new article
router.route('/add').post(auth, async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body;
    const authorInfo = await User.findById(req.user); // Find user by ID from auth middleware

    const newArticle = new Article({
      title,
      content,
      category,
      imageUrl,
      author: authorInfo.username // Automatically assign the username
    });

    await newArticle.save();
    res.json('Article added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update an article by ID
router.route('/update/:id').post(auth, (req, res) => {
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
router.route('/:id').delete(auth, (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json('Article deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;