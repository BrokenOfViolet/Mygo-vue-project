import User from '../models/User.js';

export const getUser = async(req, res) => {
    const {username} = req.params;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({
            username: user.username,
            avatar: user.avatar
        });
    } catch(err) {
        res.status(500).json({message: 'Server error'});
    }
}