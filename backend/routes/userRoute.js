import express from 'express'
import { getAllUser, login, logout, register } from '../controller/userController.js';
import { authorizeRole, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post( singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/users').get( isAuthenticated, authorizeRole("admin"), getAllUser);

export default router