const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Must be need supplier name"],
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [20, "Name is too large"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email address"],
        trim: true,
        unique: true,
        lowercase: true
    },
    brand: {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    contactNumber: {
        type: String,
        required: [true, "please provide contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            },
            message: "Please provide contact number"
        }
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "please provide emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide emergency contact number"
        }
    },
    tradeLicenseNumber: {
        type: Number,
        required: [true, "please provide trade license number"],
    },
    presentAddress: {
        type: String,
        required: [true, "please provide present address"],
    },
    permanentAddress: {
        type: String,
        required: [true, "please provide permanent address"],
    },
    location: {
        type: String,
        trim: true,
        required: [true, "Must be need supplier location"],
        enum: {
            values: ["dhaka", "chattogram", "rajshahi", "barishal", "khulna", "rangpur", "mymensingh"],
            message: "{ VALUE } is not valid name"
        },
        lowercase: true
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    },
    nationalIdImageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"],
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"]
    }
},
    {
        timestamps: true
    });

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;