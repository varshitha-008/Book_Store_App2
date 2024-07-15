import express from "express";
import booksa from "../Models/Book.js";
import reviews from "../Models/Review.js";

const BookDetails = express.Router();

export const all = async (req, res) => {
    try {
        const orders = await booksa.find();
        res.json({ data: orders, msg: "this is all books" });
    } catch (err) {
        console.log(err);
        res.send("internal error in bookdetails fetching");
    }
};

export const pagination = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const booksr = await booksa.find().limit(limit * 1).skip((page - 1) * limit).exec();
    const count=await booksa.countDocuments();

    res.send(booksr);
    // res.status(201).json({booksr,totalPages: Math.ceil(count/limit),currentPage:page});

}

export const review = async (req, res) => {
    try {
        const reviewsd = await reviews.find({ bookid: req.params.bookid }).populate('customerid');
        res.send(reviewsd);
    } catch (err) {
        console.log(err);
        res.send("internal error in bookreview fetching");
    }
}
export const addbook = async (req, res) => {
    try {
        const { title, author, price } = req.body;
        if (!title || !author || !price) {
            return res.status(400).send("All fields are required: title, author, price");
          }
           const newBook = new booksa({ title, author, price });

        // Save the book to the database
        const savedBook = await newBook.save();

        // Send a success response
        res.status(201).json(savedBook);
        // const add = await booksa.insertMany({ title, author, price });
    } catch (err) {
        console.log(err);
        res.send("Error in posting a book");
    }
}


// export default BookDetails;