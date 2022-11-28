const { getProductsService, createProductService, bulkUpdateProductService, updateProductByIdService, deleteProductByIdService, bulkDeleteProductService, checkById } = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    // exclude page, sort, limit
    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach(field => delete filters[field]);

    // gt,gte,lt,lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    filters = JSON.parse(filtersString);
    console.log(JSON.parse(filtersString));

    const queries = {};
    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(sortBy);
    }
    // fields
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(',').join(' ');
      queries.fieldsBy = fieldsBy;
      console.log(fieldsBy);
    }
    // pagination
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
      console.log(queries.skip, queries.limit);
    }

    const products = await getProductsService(filters, queries);
    // $or: [{_id: "631d2f4337566e4246df1579"}, {name: "farid"}]
    // find({}).select({name: 0}).limit(4).sort({quantity: -1})
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
      const result = await createProductService(req.body);
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
  
exports.updateProductById = async (req, res, next) => {
  try {  
    const { id } = req.params;
    const idValidation = await checkById(id);
    const result = await updateProductByIdService(id, req.body);
    if (!idValidation) {
      res.status(400).json({
        status: 'Failed',
        error: 'Invalid Id, please check your id and provide valid id'
      })
    } else if (!result.modifiedCount) {
      return res.status(400).json({
        status: 'Fail',
        error: "Product could not be updated successfully"
      })
    } else res.status(200).json({
      status: 'successful',
      message: 'Product updated successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: "Product could not be updated successfully",
      error: error.message
    })
  }
}

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: 'successful',
      message: 'Bulk update successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Bulk update could not updated successfully',
      error: error.message
    })
  }
}

exports.deleteProductById = async function (req, res, next) {
  try {
    const { id } = req.params;
    const idValidation = await checkById(id);
    const result = await deleteProductByIdService(id);

    if (!idValidation) {
      res.status(400).json({
        status: 'Failed',
        error: 'Invalid Id, please check your id and provide valid id'
      })
    }else if (!result.deletedCount) {
      return res.status(400).json({
        status: 'Fail',
        error: "Product could not be deleted successfully"
      })
    }else res.status(200).json({ 
      status: 'successful',
      message: 'Product was successfully deleted', 
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Product could not delete successfully',
      error: error.message
    })
  }
}

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: 'Successfully',
      message: 'Bulk delete successful',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Bulk delete could not delete successfully',
      error: error.message
    })
  }
}

// file upload
exports.fileUpload = async (req, res, next) => {
  try {
    res.status(200).json(req.file);
  } catch (error) {
    
  }
}