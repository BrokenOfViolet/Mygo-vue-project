import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model('Message', messageSchema);