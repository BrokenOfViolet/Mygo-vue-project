import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            username: String,
            content: String,
            createdAt: {type: Date, default: Date.now}
        }
    ]
});

export default mongoose.model('Post', postSchema);