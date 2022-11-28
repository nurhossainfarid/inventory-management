const Supplier = require('../models/Supplier.model');

exports.createSupplierService = async (data) => {
    const supplier = await Supplier.create(data);
    return supplier;
};

exports.getSupplierService = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
};

exports.updateSupplierService = async (id, data) => {
    const supplier = await Supplier.updateOne({ _id: id }, data);
    return supplier;
}