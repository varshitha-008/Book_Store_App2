import {Schema,model} from "mongoose";

const review=Schema({
    BookID:{type: Schema.Types.ObjectId,ref:'Book'},
    customerId:{type:Number,ref:'cutomers'},
    rating:Number,
    Comment:String,
})

const reviews= model('Review',review);
export default reviews;