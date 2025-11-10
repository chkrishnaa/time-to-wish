const { formidable } = require("formidable");
const cloudinary = require("../config/cloudinary");

// Configure formidable for file uploads (images only)
const form = formidable({
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowEmptyFiles: false,
  filter: ({ mimetype }) => {
    const allowedTypes = [
      "image/jpeg", 
      "image/jpg", 
      "image/png"
    ];
    return allowedTypes.includes(mimetype);
  }
});

// Middleware for parsing multipart form data
const uploadMiddleware = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }
    
    req.fields = fields;
    req.files = files;
    next();
  });
};

// Upload file to Cloudinary from file path
const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.filepath) {
      throw new Error("Invalid file object");
    }

    console.log(
      "Uploading file:",
      file.originalFilename,
      "from path:",
      file.filepath
    );

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "TimeToWish",
      resource_type: "image",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });

    console.log("Upload successful:", result.secure_url);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Upload base64 string to Cloudinary (images only)
const uploadBase64ToCloudinary = async (base64String) => {
  try {
    if (!base64String) {
      throw new Error("No base64 string provided");
    }

    console.log("Uploading base64 image to Cloudinary");

    const result = await cloudinary.uploader.upload(base64String, {
      folder: "TimeToWish",
      resource_type: "image",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });

    console.log("Base64 upload successful:", result.secure_url);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      size: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary base64 upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

module.exports = { uploadMiddleware, uploadToCloudinary, uploadBase64ToCloudinary };