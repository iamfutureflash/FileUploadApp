const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
});

// post middleware

fileSchema.post("save", async (doc) => {
    try {
        console.log("doc-->", doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: '"Test Mail 👻" <puneetvaishnav97@gmail.com>', // sender address
            to: doc.email, // list of receivers
            subject: "New File Upload on Cloudinary", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <h2>Hello world</h2>
            </br>
            <h4>Name: ${doc.name}</h4>
            <h4>Tags: ${doc.tags}</h4>
            <h4>Image Url: <a href=${doc.imageUrl} target="_blank">secure link to view image</a></h4>
            
            `, // html body
        });

        console.log("info -->", info);
    } catch (e) {
        console.log("error-->", e);
    }
})



const File = mongoose.model("File", fileSchema);
module.exports = File;