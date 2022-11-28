const Store = require('../models/Store.model');

exports.createStoreService = async (data) => {
    const store = await Store.create(data);
    return store;
};

exports.getStoreService = async () => {
    const stores = await Store.find({});
    return stores;
}