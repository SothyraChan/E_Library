import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'A bookId is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A userId is required']
    },
    rating: {
        type: Number,
        required: [true, 'A rating is required'],
        min: [0, 'Rating cannot be less than 0'],
        max: [10, 'Rating cannot be greater than 10']
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Comment', CommentSchema);
