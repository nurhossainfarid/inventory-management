const mongoose = require('mongoose');

// schema 
const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for product."],
      trim: true,
      unique: [true, "Product name must be unique"],
      minLength: [3, "Name minimum length is 3 characters"],
      maxLength: [100, "Name maximum length is 3 characters"]
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"]
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "must be use kg, litre, pcs as a product unit"
      }
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinue"],
        message: "we use as a status those values"
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true
          } else {
            return false
          }
        },
        message: "Quantity must be integer",
      },
      // createdAt: {
      //   type: Date,
      //   default: Date.now
      // }, 
      // updatedAt: {
      //   type: Date, 
      //   default: Date.now
      // }
      // supplier: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "supplier"
      // },
      // categories: [{
      //   name: {
      //     type: String,
      //     required: true,
      //   },
      //   _id: mongoose.Schema.Types.ObjectId
      //   }
      // ]
    }
  }, {
    timestamps: true
  })
  
  
  // mongoose middleware
  productSchema.pre('save', function (next) {
  
    // this
    console.log('Before saving data');
    if (this.quantity === Number(0)) {
      this.status = 'out-of-stock';
    }
  
    next();
  })
  
  // productSchema.post('save', function (doc, next) {
  
  //   console.log('After saving data');
  
  //   next();
  // })
  
  productSchema.methods.logger = function () {
  console.log(`save data for ${this.name}`);
  }
  
  // SCHEMA -> Model -> Query
  
const Product = mongoose.model('Product', productSchema);
    
module.exports = Product;