import express from 'express';
import { } from 'dotenv/config.js';
// import sequelize from './connsection/db.js';
// import connectDB from './connsection/db1.js';
// import routerin from './Routers/customer.js';
// import orderDetails from './Routers/order.js';
// import BookDetails from './Routers/books.js';
// import logger from 
import http from 'http';
import { Server } from 'socket.io'; 
import eventEmitter from './events.js'; 
import cors from 'cors';
// import orderDetails from './Routers/order.js';
import sequelize from './config/db.js';
import connectDB from './config/db1.js';
import routerin from './Routers/customers.js';
import BookDetails from './Routers/books.js';
import orderDetails from './Routers/order.js';
import { sendOrderConfirmationEmail, setupCronJobs } from './utils/email.js';
// import testConnection from './connsection/db.js';

import adminRouter from './Routers/admin.js';
import logger from './utils/logger.js';
import morgan from 'morgan';
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.use(morgan('combined'));

// app.use(morgan('combined'));


app.use(cors());
app.use(express.json());
app.use('/api/customer', routerin);
app.use('/api/orders', orderDetails);
app.use('/api/books', BookDetails);
app.use('/api/admin', adminRouter);



app.use('/', (req, res) => {
    res.send("this is home route");

});

app.use((req,res,next)=>{
    logger.info(`${req.method} ${req.url}`)
    // logger.info()

    next();
})

eventEmitter.on('orderPlaced', (order) => {
    // Notify users in real-time about the order status change
    io.emit('orderStatusChanged', { orderId: order.id, status: order.status });

    // Send order confirmation email
    sendOrderConfirmationEmail(order);

    // Log the event
    logger.info('Order placed event emitted');
});


eventEmitter.on('orderStatusChanged', (order) => {
    // Notify admin about the order status change
    io.emit('adminOrderUpdate', order);
    logger.info(`Order status changed: ${order.id}`);
});


io.on('connection', (socket) => {
    console.log('Admin connected');
    socket.on('disconnect', () => {
        console.log('Admin disconnected');
    });
});

// const PORT = process.env.PORT || 3200;
const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        logger.info('Database & tables created!');

        await connectDB();
        logger.info('Mongo connected');
        logger.info(`Server is running at ${PORT}`);

        setupCronJobs();
    } catch (err) {
        logger.error(err.message);
    }
});