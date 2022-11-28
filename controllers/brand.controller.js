const { createBrandService, getBrandService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "Success",
            message: 'Brand create successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Brand could not create successfully',
            error: error.message
        })
    }
}

exports.getBrand = async (req, res, next) => {
    try {
        const result = await getBrandService();
        res.status(200).json({
            status: 'Success',
            message: 'Brand get successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'Brand could not get successfully',
            error: error.message
        })
    }
};

exports.getBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await getBrandByIdService(id);
        if (!brand) {
            return res.status(404).json({
                status: "Fail",
                message: "Brand could not get by id"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Brand get successfully",
            data: brand
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Brand could not be found",
            error: error.message
        })
    }
};

exports.updateBrandById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const brand = await updateBrandByIdService(id, req.body);
        if (!brand.modifiedCount) {
            return res.status(400).json({
                status: "Fail",
                message: "Brand could not be update successfully"
            });
        };
        res.status(200).json({
            status: "Success",
            message: "Brand update successfully",
            data: brand
        })
    } catch (error) {
        res.status(404).send({
            status: "Fail",
            message: "Brand could not update successfully",
            error: error.message
        })
    }
}