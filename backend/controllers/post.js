import Post from '../models/Post.js';
import User from '../models/User.js';

export const like = async(req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post)
        return res.status(404).json({message: 'Post not found'})
    post.likes++;
    await post.save()
    res.json({message: 'Liked', likes: post.likes})
}

export const comment = async(req, res) => {
    const {username, content} = req.body
    const post = await Post.findById(req.params.id)
    if (!post)
        return res.status(404).json({message : 'Post not found'})
    post.comments.push({username, content})
    await post.save()
    res.json({message: 'Comment added', comments: post.comments})
}

export const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username avatar').sort({createdAt: -1});
        res.json(posts);
    } catch(err) {
        res.status(500).json({message: 'Server Error'});
    }
}

export const addPost = async(req, res) => {
    console.log('Request body:', req.body)
    const {title, content, author} = req.body;
    try {
        const newPost = new Post({title, content, author, likes: 0, comments: []})
        await newPost.save()
        res.json({message: 'Post created successfully'})
    } catch (err) {
        res.status(500).json({message: 'Failed to create post'})
    }
}