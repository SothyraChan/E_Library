import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A name is required']
    },
    price: {
        type: Number,
        required: [true, 'A price is required'],
        min: [0, 'Price cannot be less than 0']
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    length: {
        type: Number,
        required: [true, 'A length is required'],
        min: [0, 'Length cannot be less than 0']
    },
    author: {
        type: String,
        required: [true, 'An author is required']
    },
    yearPublished: {
        type: Number,
        required: [true, 'A yearPublished is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    genre: {
        type: String,
        required: [true, 'A genre is required']
    },
    contentUrl: {
        type: String,
        required: [true, 'A contentUrl is required']
    }
});

export default mongoose.model('Book', BookSchema);
