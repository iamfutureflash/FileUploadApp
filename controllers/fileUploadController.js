const File = require("../models/fileUploadModels");
const moment = require("moment");

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        if (!file) {
            res.status(402).json({
                success: false,
                message: 'Local File not found',
            });
        }

        console.log("file aagyi jee -->", file);
        const removeSpaces = file.name.split(" ").join("_").toLowerCase();
        const splitFile = file.name.split(".");
        const splitFileLength = splitFile.length - 1;
        const now = moment();
        const randomNum = Math.floor(Math.random() * 1000);
        const formattedDate = now.format('DD_MMMM_YYYY_hh[h]mm[m]ss[s]SSS[ms]A');

        let path = `${__dirname}/files/${Date.now()}${formattedDate}.${splitFile[splitFileLength]}`;
        console.log("path --> ", path);
        file.mv(path, (e) => { console.error("error while moving file -->", e); });
        res.status(200).json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });
    }
    catch (e) {
        console.log('error while uploading file ', e);
        res.status(500).json({
            success: false,
            message: 'error while uploading file',
            error: e.message,
        });
    }
}