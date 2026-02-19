const Book = require("../models/Book");


// ==============================
// GET BOOKS (Search + Pagination)
// ==============================
exports.getBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const keyword = req.query.keyword || "";

    const filter = {
      title: { $regex: keyword, $options: "i" }
    };

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(filter);

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// ADD BOOK (PDF + Cover Upload)
// ==============================
exports.addBook = async (req, res) => {
  try {
    const { title, author, category } = req.body;

    const book = await Book.create({
      title,
      author,
      category,
      pdf: req.files?.pdf?.[0]?.path || "",
      cover: req.files?.cover?.[0]?.path || ""
    });

    res.json(book);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// UPDATE BOOK
// ==============================
exports.updateBook = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
    };

    // optional file update
    if (req.files?.pdf) {
      updateData.pdf = req.files.pdf[0].filename;
    }

    if (req.files?.cover) {
      updateData.cover = req.files.cover[0].filename;
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(book);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==============================
// DELETE BOOK
// ==============================
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
