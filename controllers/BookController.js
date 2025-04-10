import BookModel from '../models/BooksModel.js'
import { bookSchema } from '../validations/bookValidation.js';

export const AddBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(detail => detail.message),
        });
    }

    const { title, author, genre, published_year } = req.body;

    try {
        const lastBook = await BookModel.findOne().sort({ bookID: -1 }).lean();
        const newBookID = (lastBook && typeof lastBook.bookID === 'number') ? lastBook.bookID + 1 : 1;

        const book = await BookModel.create({
            bookID: newBookID,
            title,
            author,
            genre,
            published_year,
        });

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
        console.error('Failed to add book:', err);
        res.status(500).json({ message: 'Failed to add book', error: err.message });
    }
};


export const UpdateBookById = async (req, res) => {
    const { id } = req.params;
    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map(detail => detail.message),
        });
    }
    const { title, author, genre, published_year } = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            id,
            { title, author, genre, published_year },
            { new: true, runValidators: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        console.error('Failed to update Book:', error);
        res.status(500).json({ message: 'Failed to update Book', error });
    }
};


export const getBookyId = async (req, res) => {
    const { id } = req.params;
    try {
        const library = await BookModel.findById(id);
        if (!library) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book found successfully', library });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get book', error: error.message });
    }
};


export const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const searchFilter = search
            ? { title: { $regex: search, $options: "i" } }
            : {};

        const totalItems = await BookModel.countDocuments(searchFilter);
        const skip = (page - 1) * limit;

        const library = await BookModel.find(searchFilter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Books fetched successfully',
            library,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: parseInt(page),
                pageSize: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books', error: error.message });
    }
};


export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};