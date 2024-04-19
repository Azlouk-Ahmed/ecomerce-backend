const Promotion = require('../models/promotion');


exports.addPromotion = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { expireDate, amount } = req.body;

        const productObj = await Promotion.find({product : id});
        if(productObj) {
            res.status(400).json({ success: false, error: "promotion exist already" });
        }
        const newPromotion = new Promotion({
            product: id,
            expireDate,
            amount
        });

        await newPromotion.save();

        res.status(201).json({ success: true, data: newPromotion });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
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


        let promotion = await Promotion.findById(id);

        if (!promotion) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }

        if (expireDate) promotion.expireDate = expireDate;
        if (amount) promotion.amount = amount;

        await promotion.save();

        res.json({ success: true, data: promotion });
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
