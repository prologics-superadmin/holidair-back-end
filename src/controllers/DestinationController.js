const DestinationService = require("../services/DestinationService");
const path = require("path");
const { deleteFiles } = require("../utils/deleteFiles");
const multer = require("multer");

class DestinationController {
  async create(req, res) {
    try {
      const response = await DestinationService.create(req.body);
      res
        .status(201)
        .json({ message: "New Destination created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async update(req, res) {
    try {
      await DestinationService.update(req.params.id, req.body);
      const response = await DestinationService.get(req.params.id);
      res
        .status(200)
        .json({ message: "New Destination Updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async get(req, res) {
    try {
      const response = await DestinationService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await DestinationService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    try {
      const response = await DestinationService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await DestinationService.delete(req.params.id);
      res.status(200).json({ message: "Deleted destination Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async imageUpload(req, res) {
    try {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads/destination/img"); // Destination folder for uploaded images
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
        const imageUrl = `uploads/destination/img/${req.file.filename}`;

        const destinationId = req.body.id;

        const destination = await DestinationService.get(destinationId);
        if (!destination) {
          res.status(404).json({ error: "no destination found" });
        }
        const oldDestinationImage = destination?.image_url;

        // Save the image URL in the database
        const updatedDestination = await DestinationService.imageUpload(
          destinationId,
          imageUrl
        );

        if (oldDestinationImage) {
          // dete oldPrdtImage
          deleteFiles([oldDestinationImage], (err) => {
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
          updatedProduct: updatedDestination,
        });
      });
    } catch (error) {
      console.error("Error handling Image upload:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DestinationController();
