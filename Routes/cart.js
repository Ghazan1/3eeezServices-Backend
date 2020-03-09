const express = require('express');
const router = express.Router();
const Cart = require('../Models/cart');
const Product = require('../Models/product');
const Brand = require('../Models/brand');
const Category = require('../Models/category');

// fetch all cart api
router.get('/list',(req, res) => {
      Cart.find({})
        .populate('item', 'name price slug')
        .exec((err, data) => {
          if (err) {
            return res.status(422).json({
              error: 'Your request could not be processed. Please try again.'
            });
          }
          res.status(200).json({
            items: data
          });
        });
    }
  );

  //Adding to the cart

  router.post('/add', async (req, res) => {

     const quantity = req.body.product.quantity;
     console.log(req.body.product.quantity);
      const item = req.body.product._id;
      const user = req.body.user;
  
      const cart = new Cart({
        quantity: quantity,
        item: item,
        user: user
      });
  
      try {
        const addedcart = await cart.save();

        res.json(addedcart);

    } catch (err) {
        console.log("Internal Server Error ", err);

        if (err) {
            res.status(500).json({ error: err })
        }
    }
    });
        
        // Cart.findById(cart._id)
        //   .populate('item', 'name price slug')
        //   .exec((err, cart) => {
        //     if (err) {
        //       return res.status(422).json({
        //         error: 'Your request could not be processed. Please try again.'
        //       });
        //     }
  
        //     res.status(200).json({
        //       success: true,
        //       message: `Item has been added to your shopping cart!`,
        //       cart: cart
        //     });
  //         });
  //     });
  //   }
  // );


  module.exports = router;