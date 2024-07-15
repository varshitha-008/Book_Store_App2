// Routers/admin.js
import express from 'express';
import { createObjectCsvWriter } from 'csv-writer';
import { Readable } from 'stream';
import Order from '../Models/order.js';

const router = express.Router();

router.get('/export-orders', async (req, res) => {
    const orders = await Order.findAll();

    const csvWriter = createObjectCsvWriter({
        path: 'orders.csv',
        header: [
            { id: 'id', title: 'ID' },
            { id: 'customerEmail', title: 'Customer Email' },
            { id: 'status', title: 'Status' },
            { id: 'createdAt', title: 'Created At' },
        ],
    });

    await csvWriter.writeRecords(orders);

    const fileStream = fs.createReadStream('orders.csv');
    res.setHeader('Content-Type', 'text/csv');
    fileStream.pipe(res);
});

export default router;

