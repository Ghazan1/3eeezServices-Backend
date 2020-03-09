const express = require('express');
const router = express.Router();

const Brand = require('../Models/brand');

// fetch all brands list
router.get('/list', (req, res) => {
    Brand.find({}, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        brands: data
      });
    });
  });

  //Adding a brand

  router.post('/add',(req, res) => {
      const name = req.body.name;
      const description = req.body.description;
  
      if (!description || !name) {
        return res
          .status(422)
          .json({ error: 'You must enter description & name.' });
      }
  
      const brand = new Brand({
        name,
        description
      });
  
      brand.save((err, brand) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
  
        res.status(200).json({
          success: true,
          message: `Brand has been added successfully!`,
          brand: brand
        });
      });
    }
  );
  router.get('/list/select',(req, res) => {
      Brand.find({}, 'name', (err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
  
        res.status(200).json({
          brands: data
        });
      });
    }
  );
  
  router.delete('/delete/:id',(req, res) => {
      Brand.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
          return res.status(422).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
  
        res.status(200).json({
          success: true,
          message: `Brand has been deleted successfully!`,
          brand: data
        });
      });
    }
  );
  module.exports = router;