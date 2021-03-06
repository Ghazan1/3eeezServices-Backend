const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const admin = require('../Middlewares/admin');
const Product = require('../Models/product');
const Brand = require('../Models/brand');
const Category = require('../Models/category');


// fetch all products api
router.get('/list', (req, res) => {
    Product.find({})
      .populate('brand', 'name')
      .exec((err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          products: data
        });
      });
  });
 
      //Adding any product to the list
  router.post('/add', [auth,admin], async (req, res) => {

      const sku = req.body.sku;
      const slug = req.body.slug;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const brand = req.body.brand;
  
      if (!sku) {
        return res.status(422).json({ error: 'You must enter sku.' });
      }
  
      if (!description || !name) {
        return res
          .status(422)
          .json({ error: 'You must enter description & name.' });
      }
  
      if (!quantity) {
        return res.status(422).json({ error: 'You must enter a quantity.' });
      }
  
      if (!price) {
        return res.status(422).json({ error: 'You must enter a price.' });
      }
          const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        slug,
        brand
        });
  
       await product.save();
       res.send(product);
      });

      // fetch product api
router.get('/item/:slug', (req, res) => {
  const slug = req.params.slug;

  Product.findOne({ slug: slug })
    .populate('brand', 'name')
    .exec((err, product) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        product: product
      });
    });
});
    
// fetch all products by category api
router.get('/list/category/:slug', (req, res) => {
  const slug = req.params.slug;

  Category.findOne({ slug: slug }, 'products -_id')
    .populate('products')
    .exec((err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        products: data.products
      });
    });
});

// fetch all products by brand api
router.get('/list/brand/:slug', (req, res) => {
  const slug = req.params.slug;

  Brand.find({ slug: slug }, (err, brand) => {
    if (err) {
      return res.status(422).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    Product.find({ brand: brand[0]._id })
      .populate('brand', 'name')
      .exec((err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        res.status(200).json({
          products: data
        });
      });
  });
});

router.get(
  '/list/select',(req, res) => {
    Product.find({}, 'name', (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        products: data
      });
    });
  }
);

router.delete('/delete/:id',(req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        product: data
      });
    });
  }
);
  
  module.exports = router;