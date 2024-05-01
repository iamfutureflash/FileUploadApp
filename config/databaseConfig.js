const mongoose = require("mongoose");

require("dotenv").config();

exports.connectWithMongoDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log("database connected successfully "); })
        .catch((e) => {
            console.error('database connection error ', e);
            process.exit(1);
        });
}