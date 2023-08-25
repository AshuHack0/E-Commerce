import mongoose from "mongoose";
import imageType, { minimumBytes } from 'image-type';
const ProductScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productDetail: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    orginalPrice: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category', //Category model mai ho export quote mai jo likhe hai wo yaha denge tho hi relation batg payega 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: String,

    }


}, { timestamps: true })


export default mongoose.model('Products', ProductScehma)