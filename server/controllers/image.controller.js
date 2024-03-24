import Image from '../models/image.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../helpers/dbErrorHandler.js';

const create = async (req, res) => {
    const image = new Image(req.body);
    try {
        await image.save();
        return res.status(200).json({
            message: "Image successfully created!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        const images = await Image.find().select('url');
        res.json(images);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const id = async (req, res, next, id) => {
    try {
        const image = await Image.findById(id);
        if (!image)
            return res.status(400).json({
                error: "The image has not been found"
            });
        req.profile = image;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve the image"
        });
    }
};

const read = (req, res) => {
    return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        let image = req.profile;
        image = extend(image, req.body);
        await image.save();
        res.json(image);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res) => {
    try {
        let image = req.profile;
        let deletedImage = await image.deleteOne();
        res.json(deletedImage);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, id, read, list, remove, update };
