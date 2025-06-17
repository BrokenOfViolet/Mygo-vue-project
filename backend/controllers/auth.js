import User from '../models/User.js';

export const register = async(req, res) => {
    const { username, password, email, avatar } = req.body
    
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({ message : 'Username already exists'})
    }

    const newUser = new User({ // Create a new user instance
        username,
        password,
        email,
        avatar
    })

    await newUser.save()    // Save the new user to the database
    res.json({ message: 'User registered successfully' }) // Send a success response
}

export const login = async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username, password }) // Find the user by username and password
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' }) // Send an error response if user not found
    }
    res.json({ message: 'Login successful', user: {
        _id: user._id,
        username: user.username
    } }) // Send a success response with user data
}

