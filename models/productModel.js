const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String 
    }
});

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    desc_prod: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    brand: brandSchema 
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
