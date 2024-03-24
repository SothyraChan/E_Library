import Comment from '../models/comment.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../helpers/dbErrorHandler.js';

const create = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        await comment.save();
        return res.status(200).json({
            message: "Comment successfully created!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        const comments = await Comment.find().select('text bookId userId rating');
        res.json(comments);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const id = async (req, res, next, id) => {
    try {
        const comment = await Comment.findById(id);
        if (!comment)
            return res.status(400).json({
                error: "The comment has not been found"
            });
        req.profile = comment;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve the comment"
        });
    }
};

const read = (req, res) => {
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let comment = req.profile;
        comment = extend(comment, req.body);
        await comment.save();
        res.json(comment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res) => {
    try {
        let comment = req.profile;
        let deletedComment = await comment.deleteOne();
        res.json(deletedComment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, id, read, list, remove, update };
