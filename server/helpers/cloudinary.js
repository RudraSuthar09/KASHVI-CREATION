require("dotenv").config(); // Secure API Keys
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

// 🔒 Secure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "doj1lcswg",
  api_key: process.env.CLOUDINARY_API_KEY || "296814797114791",
  api_secret: process.env.CLOUDINARY_API_SECRET || "L_nQ-4f68gpsqDpJKF0Zv-4UwBY",
});

// ✅ Multer Setup (Memory Storage for Direct Uploads)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true); // Accept image and video files
    } else {
      cb(new Error('Only image and video files are allowed!'), false); // Reject other files
    }
  }
});

// ✅ Upload a single media buffer to Cloudinary
async function uploadSingleMedia(fileBuffer, fileType) {
  return new Promise((resolve, reject) => {
    // Debugging: Check if fileBuffer is valid
    if (!fileBuffer || fileBuffer.length === 0) {
      console.error("Invalid file buffer received.");
      reject(new Error("Invalid file buffer"));
      return;
    }

    // Debugging: Log the file type
    console.log("Uploading file of type:", fileType);

    // Determine resource type based on file mimetype
    const resourceType = fileType.startsWith('image/') ? 'image' : 'video';

    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: resourceType,
        ...(resourceType === 'video' && {  // Add video-specific options
          chunk_size: 6000000, // 6MB chunks for better upload handling
          eager: [
            { quality: "auto", format: "mp4" } // Automatically optimize video quality and convert to mp4
          ]
        })
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);  // Log detailed Cloudinary error
          reject(error);
        } else {
          console.log("Cloudinary upload successful:", result.secure_url);
          resolve(result.secure_url); // Return secure URL only
        }
      }
    );

    // Pipe the file buffer to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

// ✅ Upload multiple media files
async function uploadMultipleMedia(files) {
  return Promise.all(files.map((file) => uploadSingleMedia(file.buffer, file.mimetype)));
}

module.exports = { upload, uploadMultipleMedia };
