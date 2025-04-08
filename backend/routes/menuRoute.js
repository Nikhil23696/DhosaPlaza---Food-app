import express from 'express'
import { deleteMenu, getAllMenu, getMenuDetails, getSingleMenu, newMenu, updateMenu } from '../controller/menuController.js';
import { authorizeRole, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js'
import { createReview, deleteReview, getAllReview } from '../controller/reviewController.js';

const router = express.Router(); 

router.route('/new').post(isAuthenticated, authorizeRole("admin"), singleUpload, newMenu);
router.route('/all').get(isAuthenticated, getAllMenu);
router.route('/menu/single').get(isAuthenticated, getSingleMenu);
router.route('/:id').get(isAuthenticated, getMenuDetails);
router.route('/menu/update').post(isAuthenticated, authorizeRole("admin"), updateMenu);
router.route('/delete/:id').delete(isAuthenticated, authorizeRole("admin"), deleteMenu);
router.route('/review/new').post(isAuthenticated, createReview);
router.route('/review/all').get(isAuthenticated, getAllReview);
router.route('/review/delete').delete(isAuthenticated, authorizeRole("admin"), deleteReview);

export default router;