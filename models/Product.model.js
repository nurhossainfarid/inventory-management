const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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
    validate: {
      validator: (value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        let isValid = true;
        value.forEach(url => {
          if (!validator.isURL(url)) {
            isValid = false;
          }
        })
        return isValid;
      },
      message: "Please provide a valid image"
    }
  }],
  category: {
    type: String,
    required: [true, "must be need product category"]
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
  
  productSchema.methods.logger = function () {
  console.log(`save data for ${this.name}`);
  }
  
  // SCHEMA -> Model -> Query
  
const Product = mongoose.model('Product', productSchema);
    
module.exports = Product;