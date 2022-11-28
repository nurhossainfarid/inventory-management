const Stock = require('../models/Stock.model');

exports.checkById = async ( id) => {
    const result = await Stock.findById({ _id: id });
    return result;
}

exports.getStockService = async (filters, queries) => {
    const Stocks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fieldsBy)
        .sort(queries.sortBy);
    const totalStocks = await Stock.countDocuments(filters);
    const pageCount = Math.ceil(totalStocks / queries.limit);
    return {totalStocks,pageCount, Stocks};
};

exports.createStockService = async (data) => {
    const Stock = await Stock.create(data);
    // // step-1 _id
    // const { _id: StockId, brand } = Stock;
    // // step-2 update brand
    // const res = await Brand.updateOne(
    //     { _id: brand.id },
    //     { $push: { Stocks: StockId } }
    // );
    // console.log(res.nModified);
    return Stock;
}

// exports.updateStockByIdService = async (StockId,data) => {
//     const result = await Stock.updateOne({ _id: StockId }, { $set: data }, { runValidators: true });
//     // const Stock = await Stock.findById(StockId);
//     // const result = await Stock.set(data).save();
//     return result;
// }

// exports.bulkUpdateStockService = async (data) => {
//     // const result = await Stock.updateMany({ _id: data.ids }, data.data, { runValidators: true });
//     const Stocks = [];
//     data.ids.forEach((Stock) => {
//         Stocks.push(Stock.updateOne({ _id: Stock.id }, Stock.data));
//     });
//     const result = await Promise.all(Stocks);
//     return result;
// }

// exports.deleteStockByIdService = async (id) => {
//     const result = await Stock.deleteOne({ _id: id });
//     return result;
// }

// exports.bulkDeleteStockService = async (ids) => {
//     const result = await Stock.deleteMany({ _id: ids });
//     return result;
// }