const express = require("express");
const app = express();
const path = require("path");
const fileupload = require("express-fileupload");
const { connectWithMongoDB } = require("./config/databaseConfig");
const { cloudinaryConnect } = require("./config/cloudinaryConfig");
const upload = require("./routes/fileUploadRoutes")
require("dotenv").config();

app.use(express.json());
app.use(fileupload());
app.use('/api/v1/upload' , upload);


const PORT = process.env.PORT || 4000;
connectWithMongoDB();
cloudinaryConnect();

app.listen(PORT, () => {
    console.log(`server started at posrt ${PORT}`);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/homepage.html'));
})



