import express from 'express';
// import { register,login,token,logout } from '../controllers/userRouter.js';
import protect from '../middleware/auth.js';
import role from '../middleware/role.js';
import { allOrders, orderById, particularOrder } from '../controlers/order.js';
// import { allorders, orderbyid, perticulatorder } from '../controlers/order.js';
// const {allorders}
const orderDetails = express.Router();

orderDetails.get('/',protect,role(["admin"]),allOrders);
orderDetails.get('/:id', protect,particularOrder);
orderDetails.get('/:id', protect,role(["admin"]),orderById);
// router.get('/logout', logout);

export default orderDetails;

