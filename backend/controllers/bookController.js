// Generated with IBM Granite
const Book = require("../models/Book");
const cloudinary = require("cloudinary").v2;

// GET all books
exports.index = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single book by ID
exports.show = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new book
exports.store = async (req, res) => {
  try {
    const {
      title,
      author,
      year,
      pages,
      currentPage,
      shelf,
      notes,
      reminder,
      genre,
      rating,
      isShared,
    } = req.body;
    const cover_url = req.file?.path || "";
    const cover_public_id = req.file?.filename || "";

    let finalGenre = genre;
    if (typeof genre === "string") {
      finalGenre = genre.split(",").map((g) => g.trim());
    } else if (!Array.isArray(genre)) {
      finalGenre = [];
    }

    let status = "Unread";
    const curr = parseInt(currentPage) || 0;
    const total = parseInt(pages);

    if (curr === 0) {
      status = "Unread";
    } else if (total && curr >= total) {
      status = "Finished";
    } else {
      status = "Reading";
    }

    const book = new Book({
      title,
      author,
      year,
      pages,
      currentPage: curr,
      status,
      shelf,
      notes,
      reminder,
      genre: finalGenre,
      rating,
      isShared: isShared || false,
      cover_url,
      cover_public_id,
      user: req.user._id,
    });

    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE existing book
exports.update = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    console.log("Isi req.body:", req.body);
    const fields = [
      "title",
      "author",
      "year",
      "pages",
      "currentPage",
      "status",
      "shelf",
      "notes",
      "reminder",
      "genre",
      "rating",
      "isShared",
    ];
    // Assign basic fields
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        book[field] = req.body[field];
      }
    });

    // Handle genre field specifically
    if (typeof req.body.genre === "string") {
      try {
        book.genre = JSON.parse(req.body.genre).map((g) =>
          g.toLowerCase().trim()
        );
      } catch {
        book.genre = req.body.genre
          .split(",")
          .map((g) => g.toLowerCase().trim());
      }
    } else if (Array.isArray(req.body.genre)) {
      book.genre = req.body.genre.map((g) => g.toLowerCase().trim());
    }

    if (req.body.currentPage !== undefined) {
      const curr = parseInt(req.body.currentPage);
      const total = book.pages;

      if (curr === 0) {
        book.status = "Unread";
      } else if (total && curr >= total) {
        book.status = "Finished";
      } else {
        book.status = "Reading";
      }
    }

    if (req.file) {
      if (book.cover_public_id) {
        await cloudinary.uploader.destroy(book.cover_public_id);
      }
      book.cover_url = req.file.path;
      book.cover_public_id = req.file.filename;
    }

    const updated = await book.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE book (and cover image from cloudinary)
exports.destroy = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.cover_public_id) {
      await cloudinary.uploader.destroy(book.cover_public_id);
    }

    await book.deleteOne();
    res.json({ message: "Book successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
