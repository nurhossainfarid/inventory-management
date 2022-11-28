const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide category name"],
        unique: true,
        lowercase: true,
    },
    description: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide valid image URL"]
    }
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;