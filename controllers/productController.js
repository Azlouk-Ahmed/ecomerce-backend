const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const { product_name, desc_prod, price, stock, category, brand } = req.body;

        const newProduct = new Product({
            product_name,
            desc_prod,
            price,
            stock,
            category,
            brand
        });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, desc_prod, price, stock } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            { product_name, desc_prod, price, stock },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, data: deletedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
