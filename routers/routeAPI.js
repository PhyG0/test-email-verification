import express from 'express';
import usersController from '../controllers/usersController.js';
import verifyRole from '../middleware/verifyRole.js';

const router = express.Router();

router.get('/users', verifyRole({ mod: true, admin: true }), usersController.getUsers);
router.get('/users/:username', verifyRole({ mod: true, admin: true }), usersController.getUser);
router.delete('/users/:username', verifyRole({ admin: true }), usersController.deleteUser);

export default router;