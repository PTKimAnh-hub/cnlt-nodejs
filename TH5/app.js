const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

const app = express();

// connect DB
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/', postRoutes);

// server
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
