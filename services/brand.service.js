const Brand = require('../models/Brand.model');

exports.createBrandService = async (data) => {
    const result = await Brand.create(data);
    return result;
};

exports.getBrandService = async () => {
    const brands = await Brand.find({}).populate('products');
    // .select('-suppliers')
    return brands;
};

exports.getBrandByIdService = async (id) => {
    const brand = await Brand.findOne({ _id: id });
    return brand;
}

exports.updateBrandByIdService = async (id, data) => {
    const brand = await Brand.updateOne({ _id: id }, data );
    return brand;
}