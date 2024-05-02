const multer = require('multer');

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Naming files to avoid conflicts
  }
});

// Initialize multer middleware
const upload = multer({ storage: storage });

module.exports = upload;