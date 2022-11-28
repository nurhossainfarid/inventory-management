const { createSupplierService, getSupplierService, updateSupplierService } = require("../services/supplier.service")

exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);
        if (!result) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to create supplier"
            })
        };
        res.status(200).json({
            status: "Success",
            message: "Supplier created successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Supplier could not create successfully",
            error: error.message
        })
    }
};

exports.getSupplier = async (req, res, next) => {
    try {
        const result = await getSupplierService();
        if (!result) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to get supplier"
            })
        };
        res.status(200).json({
            status: "Success",
            message: "Supplier get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Supplier could not get successfully",
            error: error.message
        })
    }
}

exports.updateSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateSupplierService(id, req.body);
        if (!result) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to update supplier"
            })
        };
        res.status(200).json({
            status: "Success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Supplier could not update successfully",
            error: error.message
       }) 
    }
}