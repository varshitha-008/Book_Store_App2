import {Schema,model} from "mongoose";

const book=new Schema({
    title:String,
    author:String,
    price:Number,

});
const booksa= model('Book',book);

export default booksa;