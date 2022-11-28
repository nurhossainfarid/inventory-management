const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    maxLength: 20,
                    minLowercase: 3,
                    minUppercase: 1,
                    minSymbols: 1,
                    minNumbers: 1
                })
            }, 
            message: "Password {VALUE} is not strong enough"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Password does not match"
        }
    },
    role: {
        type: String,
        enum: ["buyer", "admin", "store-manager"],
        default: "buyer",
        lowercase: true
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "please provide your first name"],
        lowercase: true,
        minLength: [3, "Name minimum length is 3 characters"],
        maxLength: [20, "Name maximum length is 20 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "please provide your first name"],
        lowercase: true,
        minLength: [3, "Name minimum length is 3 characters"],
        maxLength: [20, "Name maximum length is 20 characters"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "please provide your valid phone number"]
    },
    shippingCard: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "please provide your valid url"]
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    passwordChangeAt: Date,
    passwordRestToken: String,
    passwordRestExpires: Date
});


userSchema.pre("save", function (next) {
    const password = this.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    this.password = hashPassword;
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.comparePassword = function (password, hashPassword) {
    const isPasswordValid = bcrypt.compareSync(password, hashPassword);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;