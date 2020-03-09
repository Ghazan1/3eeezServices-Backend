const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const ProductSchema = new Schema({
  sku: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },

  slug: { 
     type: String,
     slug: 'name',
     unique: true },

  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Product', ProductSchema);