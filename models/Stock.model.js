const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');

// schema 
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
      type: String,
      required: [true, "Please provide a name for product."],
      trim: true,
      minLength: [3, "Name minimum length is 3 characters"],
      maxLength: [100, "Name maximum length is 3 characters"]
    },
    description: {
      type: String,
      required: true,
    },
    price:{
        type: Number,
        required: true,
        min: [0, "Price never take negative value"],
    },
    quantity:{
        type: Number,
        required: true,
        min: [0, "Price never take negative value"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "must be use kg, litre, pcs, bag as a product unit"
      }
    },
  imageURLs: [{
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide valid url"]
    // validate: {
    //   validator: (value) => {
    //     if (!Array.isArray(value)) {
    //       return false;
    //     }
    //     let isValid = true;
    //     value.forEach(url => {
    //       if (!validator.isURL(url)) {
    //         isValid = false;
    //       }
    //     })
    //     return isValid;
    //   },
    //   message: "Please provide a valid image"
    // }
  }],
  category: {
    type: String,
    required: true
  },
  brand: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true
    }
  },
  status: {
      type: String,
      required: true,
      enum: {
          values: ["in-stock", "out-of-stock", "discontinue"],
          message: "status can't be {VALUE}"
      }
    }, 
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Must be need store name"],
            unique: true,
            lowercase: true,
            enum: {
                values: ["Chattogram", "Dhaka", "Barishal", "Khulna", "Rajshahi", "Rangpur", "Mymensingh"],
                message: "{ VALUE } is not valid name",
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store"
        }
    },
    suppliers: {
        name: {
            type: String,
            trim: true,
            required: [true, "Must be need supplier name"],
        },
        id: {
            type: ObjectId,
            ref: "Suppliers"
        }
    },
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    }
  }, {
    timestamps: true
  })
  
  
  // mongoose middleware
  stockSchema.pre('save', function (next) {
  
    // this
    console.log('Before saving data');
    if (this.quantity === Number(0)) {
      this.status = 'out-of-stock';
    }
  
    next();
  })
  
  stockSchema.methods.logger = function () {
  console.log(`save data for ${this.name}`);
  }
  
  // SCHEMA -> Model -> Query
  
const Stock = mongoose.model('Stock', stockSchema);
    
module.exports = Stock;