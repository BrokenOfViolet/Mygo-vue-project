import express from 'express';
import {like, comment, getAllPosts, addPost} from '../controllers/post.js';

const router = express.Router();

router.post('/:id/like',like)
router.post('/:id/comment', comment)

router.get('/', getAllPosts)
router.post('/', addPost)

export default router;