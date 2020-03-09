const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Brand', BrandSchema);
