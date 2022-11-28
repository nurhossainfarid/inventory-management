const { createCategoryService, getCategoryService, getCategoryByIdService, updateCategoryByIdService } = require('../services/category.service');

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);
        if (!result) {
            return res.status(400).json({
                status: "Failed",
                error: "Category could not be created successfully"
            })
        };
        res.status(200).json({
            status: "Success",
            message: "Category create successfully",
            data: result
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Category could not create successfully",
            error: error
        });
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const category = await getCategoryService();
        if (!category) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to get category"
            });
        };
        res.status(200).json({
            status: "Success",
            message: "Category get successfully",
            data: category
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Category could not get successfully",
            error: error.message
        });
    }
};

exports.getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const categoryBy = await getCategoryByIdService(id);
        if (!categoryBy) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to get category by id"
            })
        };
        res.status(200).json({
            status: 'successful',
            message: "Successfully to get category by id",
            data: categoryBy
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Category could not get successfully",
            error: error.message
        });
    }
};

exports.updateCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const categoryUpdate = await updateCategoryByIdService(id, req.body);
        if (!categoryUpdate.modifiedCount) {
            return res.status(400).json({
                status: "Fail",
                message: "Category could not be update successfully"
            });
        };
        res.status(200).json({
            status: "Success",
            message: "Category updated successfully",
            data: categoryUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Category could not update successfully",
            error: error.message
        });
    }
}