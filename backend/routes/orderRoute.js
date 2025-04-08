import express from 'express'
import { deleteOrder, getAllOrder, getMyOrder, getMyOrderDetails, newOrder, updateOrder } from '../controller/orderController.js';
import { authorizeRole, isAuthenticated } from '../middlewares/auth.js';
import { processPayment, sendStripeApiKey } from '../controller/paymentController.js';

const router = express.Router();

router.route('/new').post(isAuthenticated, newOrder);
router.route('/all').get(isAuthenticated, authorizeRole("admin"), getAllOrder);
router.route('/order/me').get(isAuthenticated, getMyOrder);
router.route('/order/update').put(isAuthenticated, authorizeRole("admin"), updateOrder);
router.route('/delete/:id').delete(isAuthenticated, authorizeRole("admin"), deleteOrder);
router.route('/payment/process').post(isAuthenticated, processPayment)
router.route('/stripeapikey').get(isAuthenticated, sendStripeApiKey)
router.route('/:id').get(isAuthenticated, getMyOrderDetails);

export default router;