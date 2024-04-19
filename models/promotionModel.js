const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Promotion", promotionSchema);
