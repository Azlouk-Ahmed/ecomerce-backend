const Address = require('../models/adressModel');

exports.createAddress = async (req, res) => {
    try {
        const { country, city, address, zipcode } = req.body;
        const userId = req.user._id;

        const newAddress = await Address.create({
            country,
            city,
            address,
            zipcode,
            user: userId
        });

        res.status(201).json({ success: true, data: newAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { country, city, address, zipcode } = req.body;
        const userId = req.user._id;

        const updatedAddress = await Address.findOneAndUpdate(
            { _id: id, user: userId },
            { country, city, address, zipcode },
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to update it' });
        }

        res.json({ success: true, data: updatedAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const deletedAddress = await Address.findOneAndDelete({ _id: id, user: userId });

        if (!deletedAddress) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to delete it' });
        }

        res.json({ success: true, data: deletedAddress });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.getSpecificAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        const address = await Address.findOne({ user: userId });

        if (!address) {
            return res.status(404).json({ success: false, error: 'Address not found or you do not have permission to access it' });
        }

        res.json({ success: true, data: address });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const userId = req.user._id;

        const addresses = await Address.find({ user: userId });

        res.json({ success: true, data: addresses });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }

};
