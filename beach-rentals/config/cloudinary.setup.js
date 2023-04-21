const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dadwbxo8c",
  api_key: "839868485247829",
  api_secret: "EpcdzGacNmBFVEFskq_Dkncxbbk",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "jpeg"],
    folder: "rentalPic",
    resource_type: "raw",
  },
});

module.exports = multer({ storage });
