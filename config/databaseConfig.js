const mongoose = require("mongoose");

require("dotenv").config();

exports.connectWithMongoDB = () => {
    mongoose.connect("mongodb://localhost:27017/fileUploadApp")
        .then(() => { console.log("database connected successfully "); })
        .catch((e) => {
            console.error('database connection error ', e);
            process.exit(1);
        });
}