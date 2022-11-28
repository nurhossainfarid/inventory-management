const { createStoreService, getStoreService } = require("../services/store.service")

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);
        if (!result) {
            return res.status(400).json({
                status: "Failed",
                error: "Failed to create store"
            })
        };
        res.status(200).json({
            status: 'successful',
            message: "Store create successfully",
            data: result
        })
        
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Store could not create successfully",
            error: error.message
        })
    }
};

exports.getStore = async (req, res, next) => {
    try {
        const result = await getStoreService();
        if (!result) {
            return res.status(200).json({ 
                status: "Failed",
                error: "Failed get store"
            })
        };
        res.status(200).json({
            status: "Success",
            message: "Store get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Store get failed please check error message",
            error: error.message
        })
    }
}