const Product = require('../models/Product.model');
const Brand = require('../models/Brand.model');

exports.checkById = async ( id) => {
    const result = await Product.findById({ _id: id });
    return result;
}

exports.getProductsService = async (filters, queries) => {
    const products = await Product.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fieldsBy)
        .sort(queries.sortBy);
    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil(totalProducts / queries.limit);
    return {totalProducts,pageCount, products};
};

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    // step-1 _id
    const { _id: productId, brand } = product;
    // step-2 update brand
    const res = await Brand.updateOne(
        { _id: brand.id },
        { $push: { products: productId } }
    );
    console.log(res.nModified);
    return product;
}

exports.updateProductByIdService = async (productId,data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true });
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}

exports.bulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true });
    const products = [];
    data.ids.forEach((product) => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });
    const result = await Promise.all(products);
    return result;
}

exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}

exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids });
    return result;
}