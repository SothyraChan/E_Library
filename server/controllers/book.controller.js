import Book from '../models/book.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../helpers/dbErrorHandler.js';

const create = async (req, res) => {
    const book = new Book(req.body);
    try {
        await book.save();
        return res.status(200).json({
            message: "Book successfully created!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let books;
        if (req.query.name) {
            books = await Book.find({ "name": { $regex: req.query.name } }).select('name price author yearPublished genre');
        } else {
            books = await Book.find().select('name price author yearPublished genre');
        }
        res.json(books);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const id = async (req, res, next, id) => {
    try {
        let book = await Book.findById(id);
        if (!book)
            return res.status(400).json({
                error: "The book has not been found"
            });
        req.profile = book;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve the book"
        });
    }
};

const read = (req, res) => {
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let book = req.profile;
        book = extend(book, req.body);
        await book.save();
        res.json(book);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res) => {
    try {
        let book = req.profile;
        let deletedBook = await book.deleteOne();
        res.json(deletedBook);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const deleteAll = async (req, res) => {
    try {
        let books = await Book.find().deleteMany({});
        res.json(books);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, id, read, list, remove, update, deleteAll };
