import express from "express";
import authController from "../controllers/authController.js";
import refreshController from '../controllers/refreshController.js';

const router = express.Router();

router.post('/register', authController.handleRegister);
router.post('/login', authController.handleLogin);
router.get('/refresh', refreshController.handleRefresh);


export default router;