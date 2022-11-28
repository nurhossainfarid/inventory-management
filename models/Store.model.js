const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Must be need store name"],
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "barishal", "khulna", "rangpur", "mymensingh"],
            message: "{ VALUE } is not valid name"
          },
        unique: true,
        lowercase: true
    
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        lowercase: true
    },
    manager: [{
        name: String,
        contractNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    }],

}, {
    timestamps: true,
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;