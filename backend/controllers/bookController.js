const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const book = new Book({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user }).populate('addedBy', 'name');
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single book
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log('Fetching book ID:', bookId);  // Debug: Log ID
    const book = await Book.findById(bookId).populate('addedBy', 'name');
    console.log('Found book:', book ? book.title : 'null');  // Debug: Log book or null
    if (!book) {
      console.log('Book not found in DB');
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error('getBook error:', err);  // Log errors
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log('Updating book ID:', bookId, 'User ID:', req.user);  // Debug
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.toString()) {
      console.log('Unauthorized update - addedBy:', book.addedBy, 'req.user:', req.user);  // Debug
      return res.status(403).json({ message: 'Not authorized to edit this book' });
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
    console.log('Updated book:', updatedBook.title);  // Debug
    res.json(updatedBook);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log('Deleting book ID:', bookId, 'User ID:', req.user);  // Debug
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.toString()) {
      console.log('Unauthorized delete - addedBy:', book.addedBy, 'req.user:', req.user);  // Debug
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Book.findByIdAndDelete(bookId);
    console.log('Deleted book ID:', bookId);  // Debug
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
