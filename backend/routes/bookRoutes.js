const express = require('express');
const router = express.Router();
const { getBooks, getBook, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// GET all books (protected)
router.get('/', protect, getBooks);

// GET single book (public - no protect)
router.get('getbook/:id', getBook);  // Confirmed public

// Protected
router.post('/', protect, addBook);
router.put('/:id', protect, updateBook);
router.delete('/deletebook/:id', protect, deleteBook);

module.exports = router;