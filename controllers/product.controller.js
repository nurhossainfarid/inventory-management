const Product = require('../models/Product.model');

exports.getProducts = async (req, res, next) => {
    try {
      // $or: [{_id: "631d2f4337566e4246df1579"}, {name: "farid"}]
      // find({}).select({name: 0}).limit(4).sort({quantity: -1})
        const products = await Product.find({});
        // .where("name").equals(/\w/)
        // .where('quantity').gt(10)
        // .limit(4)
        // .sort({ quantity: -1 });
      res.status(200).json({
        status: "success",
        data: products
      })
    } catch (error) {
      res.status(404).json({
        status: 'Fail',
        message: "Data can't read",
        error: error.message
      })
    }
}
  
exports.createProduct = async (req, res, next) => {
    // save or create methods
    try {
      const result = await Product.create(req.body);
      result.logger();
  /*     //// instance -> Do something -> save()
      const product = new Product(req.body);
      if (product.quantity === Number(0)) {
        product.status = 'out-of-stock';
      }
      const result = await product.save(); */
      res.status(200).json({
        status: 'successful',
        message: 'Product inserted successfully',
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: 'Product can not inserted',
        error: error.message
      })
    }
}
  