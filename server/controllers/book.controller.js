import Book from '../models/book.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../helpers/dbErrorHandler.js';
import formidable from 'formidable'
import fs from 'fs'

const create = async (req, res) => {
    
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    console.log(req.body)
    form.parse(req, async (err, fields, files) => {
        let book = new Book (fields)
        try {
            let result = await book.save()
                res.status(200).json(result)
            }catch (err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
            }

        })
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

const bookById = async (req, res, next, id) => {
    
    try {
        console.log(id);
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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
              message: "There was an error updating this book."
            })
          }
    let book = req.profile;
    book = extend(book, fields);
    try {
        let result = await book.save();
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
    })
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

export default { create, bookById, read, list, remove, update, deleteAll };
