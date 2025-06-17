import express from 'express';
import {register, login} from '../controllers/auth.js';
import {getUser} from '../controllers/user.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

router.get('/:username', getUser);

export default router // Export the router to use in the main server file