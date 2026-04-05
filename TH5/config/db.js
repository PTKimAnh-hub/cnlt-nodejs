const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog');
        console.log("Kết nối MongoDB thành công");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
