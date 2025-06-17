import Message from '../models/Message.js';

export const sendMessage = async(req, res) => {
    const {from, to, content} = req.body;
    if (!from || !to || !content) return res.status(400).json({message:'Missing fields'});

    try {
        const msg = new Message({from, to, content});
        await msg.save();
        res.json({message: 'Message sent successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
};

export const getConversation = async(req, res) => {
    const {user1, user2} = req.query;
    try {
        const messages = await Message.find({
            $or: [
                {from: user1, to: user2},
                {from: user2, to: user1}
            ]
        }).sort({createdAt:1});
        res.json(messages);
    } catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};