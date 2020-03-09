const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Routes
const product = require('./Routes/product');
const brand = require('./Routes/brand');
const cart = require('./Routes/cart');
const category = require('./Routes/category');
const user = require('./Routes/user');
const auth = require('./Routes/auth');

mongoose.connect('mongodb://localhost:27017/3eeezServices', { useNewUrlParser: true })
.then(() => console.log('Connected to the Database!'))
.catch(() => console.log('Error While connecting to the Database!'));

app.use(express.json());
app.use('/product', product);
app.use('/brand',brand);
app.use('/cart',cart);
app.use('/category',category);
app.use('/user',user);
app.use('/auth',user);

app.listen(3000, () => console.log("Listing on port 3000"));


