import express from "express";
import order from "../Models/order.js";
import eventEmitter from "../events.js"; 
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

export const allOrders = async (req, res) => {
    try {
        const orders = await order.findAll();
        res.json({ data: orders, msg: "this is all orders" });
    } catch (err) {
        console.log(err);
        res.send("internal error in order details fetching");
    }
};

export const particularOrder = async (req, res) => {
    try {
        const orders = await order.findAll({ where: { customerId: req.params.customerid } });
        res.json({ data: orders, msg: "this is all orders" });
    } catch (err) {
        console.log(err);
        res.send("internal error in order details fetching");
    }
};

export const orderById = async (req, res) => {
    try {
        const orders = await order.findAll({ where: { customerId: req.params.customerid } });
        res.json({ data: orders, msg: "this is all orders for a particular customer" });
    } catch (err) {
        console.log(err);
        res.send("internal error in order details fetching");
    }
};

// New endpoint to place an order
export const placeOrder = async (req, res) => {
    try {
        const { customerId, totalAmount } = req.body;
        const newOrder = await order.create({
            customerId,
            totalAmount
        });

        // Emit the orderPlaced event
        eventEmitter.emit('orderPlaced', newOrder);

        res.status(201).json({ data: newOrder, msg: "Order placed successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send("internal error in placing the order");
    }
};
