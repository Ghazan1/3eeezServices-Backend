const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Cart Schema
const CartSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Mongoose.model('Cart', CartSchema);
