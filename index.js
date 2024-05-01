const express = require("express");
const path = require("path"); // Import the path module
const { connectWithMongoDB } = require("./config/databaseConfig");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server started at posrt ${PORT}`);
});
app.get("/", (req, res) => { 
    // res.send("<h1 style=>this is file upload homepage</h1>");
    // res.sendFile("./public/homepage.html");
    res.sendFile(path.join(__dirname, '/public/homepage.html'));
})
connectWithMongoDB();