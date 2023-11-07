import express from 'express';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // root directory

const router = express.Router();

router.get('/:token', async (req, res) => {
    const token = req.params.token;

    const findOne = await User.findOne({ _id: token });

    findOne.verified = true;
    await findOne.save();

    res.status(200).sendFile(path.join(__dirname, '..', 'services', 'successful.html'));

}); 

export default router;

