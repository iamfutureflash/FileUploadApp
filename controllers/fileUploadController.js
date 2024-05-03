const File = require("../models/fileUploadModels");
const cloudinary = require("cloudinary").v2;
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
        const removeSpaces = file.name.split(" ").join("_").split(".").join("_").split("-").join("_").toLowerCase();
        const splitFile = file.name.split(".");
        const splitFileLength = splitFile.length - 1;
        const now = moment();
        const formattedDate = now.format('DD_MMMM_YYYY_hh[h]mm[m]ss[s]SSS[ms]A');

        // let path = `${__dirname}/files/${removeSpaces}_${Date.now()}${formattedDate}.${splitFile[splitFileLength]}`;
        let path = `${__dirname}/files/${Date.now()}_t_${formattedDate}.${splitFile[splitFileLength]}`;
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

const uploadFileToCloudinary = async (file, folder, quality) => {
    const options = { folder };
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}


exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imageFile;
        console.log('req data --> ', name, email, tags, file);

        const image_size_bytes = file.size;
        // console.log('req data --> ', name, email, tags, file);
        const image_size_mb = image_size_bytes / (1024 * 1024)
        console.log('req size --> ', file.size, "image_size_mb --> ", image_size_mb);
        if (image_size_mb > 5) {
            return res.status(401).json({
                success: false,
                message: `image size is greater than 5 mb`,
            })
        }
        const supportedTypes = ["jpg", "jpeg", "png"];
        const splitFile = file.name.split(".");
        const splitFileLength = splitFile.length - 1;
        const fileType = splitFile[splitFileLength];
        console.log("splitFile, splitFileLength, fileType --> ", splitFile, splitFileLength, fileType);
        try {
            if (!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(401).json({
                    success: false,
                    message: `${fileType} image format not supported`,
                })
            }
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "error during image format check",
                error: e
            })
        }


        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log("response ---> ", response);
        // 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });


        res.status(200).json({
            success: true,
            response: fileData,
            message: "image successfully uploaded",
        })
    }
    catch (e) {
        console.error("file upload error --> ", e);
        res.status(500).json({
            success: false,
            message: "error during file upload",
            error: e
        })
    }
}



const isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
}


exports.videoUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        console.log('req data --> ', name, email, tags,);
        const file = req.files.videoFile;
        // console.log('req.files.videoFile --> ', file);
        const video_size_bytes = file.size;
        // console.log('req data --> ', name, email, tags, file);
        const video_size_mb = video_size_bytes / (1024 * 1024)
        console.log('req size --> ', file.size, "video_size_mb --> ", video_size_mb);
        if (video_size_mb > 10) {
            return res.status(401).json({
                success: false,
                message: `video size is greater than 10 mb`,
            })
        }
        console.log('req data --> ', name, email, tags, file);

        const supportedTypes = ["mp4"];
        const splitFile = file.name.split(".");
        const splitFileLength = splitFile.length - 1;
        const fileType = splitFile[splitFileLength];
        console.log("splitFile, splitFileLength, fileType --> ", splitFile, splitFileLength, fileType);
        try {
            if (!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(401).json({
                    success: false,
                    message: `${fileType} video format not supported`,
                })
            }
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "error during video format check",
                error: e
            })
        }


        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log("response ---> ", response);
        // 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });


        res.status(200).json({
            success: true,
            response: fileData,
            message: "image successfully uploaded",
        })
    }
    catch (e) {
        console.error("file upload error --> ", e);
        res.status(500).json({
            success: false,
            message: "error during file upload",
            error: e
        })
    }
}
exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imageFile;
        const image_size_bytes = file.size;
        // console.log('req data --> ', name, email, tags, file);
        console.log('req size --> ', file.size);
        const image_size_mb = image_size_bytes / (1024 * 1024)
        if (image_size_mb > 5) {
            return res.status(401).json({
                success: false,
                message: `file size is greater than 5 mb`,
            })
        }
        const supportedTypes = ["jpg", "jpeg", "png"];
        const splitFile = file.name.split(".");
        const splitFileLength = splitFile.length - 1;
        const fileType = splitFile[splitFileLength];
        // console.log("splitFile, splitFileLength, fileType --> ", splitFile, splitFileLength, fileType);
        try {
            if (!isFileTypeSupported(fileType, supportedTypes)) {
                return res.status(401).json({
                    success: false,
                    message: `${fileType} video format not supported`,
                })
            }
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "error during video format check",
                error: e
            })
        }


        const response = await uploadFileToCloudinary(file, "codehelp", 30);
        console.log("response ---> ", response);
        // 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        });


        res.status(200).json({
            success: true,
            response: fileData,
            message: "image successfully uploaded",
        })
    }
    catch (e) {
        console.error("file upload error --> ", e);
        res.status(500).json({
            success: false,
            message: "error during file upload",
            error: e
        })
    }
}