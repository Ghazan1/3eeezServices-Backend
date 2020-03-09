const express = require('express');
const router = express.Router();

const Category = require('../Models/category');

router.get('/list', (req, res) => {
    Category.find({}, (err, data) => {
      if (err) {
        return res.status(422).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      res.status(200).json({
        categories: data
      });
    });
  });

  module.exports = router;