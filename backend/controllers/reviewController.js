const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;
    const review = new Review({
      bookId,
      userId: req.user,
      rating,
      reviewText
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update review (only if user is the reviewer)
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete review (only if user is the reviewer)
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/reviews/book/:bookId - Get all reviews for a book (public, optional if not using book details)
exports.getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate('userId', 'name');
    const avgRating = reviews.length
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2)
      : null;
    res.json({ reviews, avgRating });
  } catch (err) {
    console.error('Reviews error:', err);  // Log for debug
    res.status(500).json({ message: 'Server error' });
  }
};

