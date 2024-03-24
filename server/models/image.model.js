import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'URL is required']
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Image', ImageSchema);
