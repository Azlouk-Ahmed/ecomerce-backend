const Promotion = require('../models/promotionModel');
const Product = require('../models/productModel');


exports.addPromotion = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { expireDate, amount } = req.body;

        const product = await Product.findById(id);
        if(!product) {
            return res.status(400).json({ success: false, error: "product not found" });
        }
        const existingPromotions = await Promotion.find({ product: id });
        if (existingPromotions.length > 0) {
            return res.status(400).json({ success: false, error: "Promotion already exists for this product" });
        }
        const newPromotion = new Promotion({
            product: id,
            expireDate,
            amount
        });

        await newPromotion.save();

        res.status(201).json({ success: true, data: newPromotion });
    } catch (error) {
        res.status(405).json({ success: false, error: error.message });
    }
};

exports.getProductPromotion = async (req, res) => {
    try {
        const productId = req.params.productId;

        const promotion = await Promotion.findOne({ product: productId });

        if (!promotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found for this product' });
        }

        res.json({ success: true, data: promotion });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.modifyPromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { expireDate, amount } = req.body;

        const updatedPromotion = await Promotion.findOneAndUpdate(
            { _id: id },
            { expireDate, amount } ,
            { new: true }
        );

        if (!updatedPromotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }

        res.json({ success: true, data: updatedPromotion });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;

        const promotion = await Promotion.findById(id);

        if (!promotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }


        await promotion.remove();

        res.json({ success: true, message: 'Promotion deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
