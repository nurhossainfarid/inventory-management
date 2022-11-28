const express = require('express');
const router = express.Router();
const productController = require('../controllers/stock.controller');


// router.route('/bulk-update').patch(productController.bulkUpdateProduct)
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct)
router.route('/')
    .get(productController.getStock)
    .post(productController.createStock)
// router.route('/:id')
//     .patch(productController.updateProductById)
//     .delete(productController.deleteProductById)
module.exports = router;