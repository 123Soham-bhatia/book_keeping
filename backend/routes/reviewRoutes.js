const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview, getReviewsByBook } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

// GET reviews by book (public—no protect)
router.get('/book/:bookId', getReviewsByBook);

module.exports = router;