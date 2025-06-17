import express from 'express';
import {sendMessage, getConversation} from '../controllers/message.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/', getConversation);

export default router;