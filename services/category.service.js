const Category = require('../models/Category.model');

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
};

exports.getCategoryService = async () => {
    const categories = await Category.find({});
    return categories;
};

exports.getCategoryByIdService = async (id) => {
    const category = await Category.findById(id);
    return category;
};

exports.updateCategoryByIdService = async (id, data) => {
    const categoryUp = await Category.updateOne({ _id: id }, data);
    return categoryUp;
}