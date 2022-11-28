const mongoose = require('mongoose');
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Must be need brand name"],
        minLength: [3, "At least brand name have 3 characters"],
        maxLength: [100, "Brand name can't over 100 characters"],
        unique: true,
        lowercase: true
    },
    products: [{
        type: ObjectId,
        ref: "Product",
    }],
    description: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Must be an brand email address"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website URL"],
        lowercase: true,
    },
    location: {
        type: String,
    },
    suppliers: [{
        name: String,
        contractNumber: String,
        id: {
            type: ObjectId,
            ref: "Suppliers"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, {
    timestamps: true,
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;