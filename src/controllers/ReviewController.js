const ReviewService = require("../services/ReviewService");
const multer = require("multer");
const path = require("path");
const { deleteFiles } = require("../utils/deleteFiles");

class ReviewController {
  async create(req, res) {
    try {
      const response = await ReviewService.create(req.body);
      res.status(201).json({ message: "New Review created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    // try {
    await ReviewService.update(req.params.id, req.body);
    const response = await ReviewService.get(req.params.id);
    res.status(200).json({ message: "Review updated", data: response });
    // } catch (_) {
    //   res.status(500).json({ error: "Internal server error" });
    // }
  }

  async get(req, res) {
    try {
      const response = await ReviewService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await ReviewService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    try {
      const response = await ReviewService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await ReviewService.delete(req.params.id);
      res.status(200).json({ message: "Deleted review Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async imageUpload(req, res) {
    try {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads/review/img"); // Destination folder for uploaded images
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9); // Unique filename
          const extension = path.extname(file.originalname); // File extension using 'path' module
          cb(null, uniqueSuffix + extension); // Final filename
        },
      });

      const upload = multer({ storage: storage }).single("image"); // 'image' is the field name for the uploaded image

      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // Multer error handling
          return res.status(500).json({ error: err.message });
        } else if (err) {
          // Other errors
          return res.status(500).json({ error: err.message });
        }

        // File uploaded successfully
        const imageUrl = `uploads/review/img/${req.file.filename}`;

        const reviewId = req.body.id;

        const review = await ReviewService.get(reviewId);
        if (!review) {
          res.status(404).json({ error: "no banner found" });
        }
        const oldReviewImage = review?.image_url;

        // Save the image URL in the database
        const updatedReview = await ReviewService.imageUpload(
          reviewId,
          imageUrl
        );

        if (oldReviewImage) {
          // dete oldPrdtImage
          deleteFiles([oldReviewImage], (err) => {
            if (err) {
              console.error("Error deleting files:", err);
            } else {
              console.log("All files deleted successfully.");
            }
          });
        }

        res.status(200).json({
          message: "Image uploaded successfully",
          imageUrl: imageUrl,
          updatedProduct: updatedReview,
        });
      });
    } catch (error) {
      console.error("Error handling Image upload:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ReviewController();
