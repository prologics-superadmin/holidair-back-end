const BannerService = require("../services/BannerService");

class BannerController {
  async create(req, res) {
    try {
      const response = await BannerService.create(req.body);
      await this.imageUpload(req, response._id);
      res.status(201).json({ message: "New Banner created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      await BannerService.update(req.params.id, req.body);
      const response = await BannerService.getById(req.params.id);
      res.status(200).json({ message: "Banner updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async get(req, res) {
    try {
      const response = await BannerService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await BannerService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    try {
      const response = await BannerService.getList(req.params.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await BannerService.delete(req.params.id);
      res.status(200).json({ message: "Deleted banner Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async imageUpload(req, bannerId) {
    try {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads/banner/img"); // Destination folder for uploaded images
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
        const imageUrl = `uploads/banner/img/${req.file.filename}`;

        // const bannerId = bannerId;

        const banner = await BannerService.getById(bannerId);
        if (!banner) {
          res.status(404).json({ error: "no banner found" });
        }
        const oldBannerImage = banner.banner_url;

        // Save the image URL in the database
        const updatedBanner = await BannerService.imageUpload(
          bannerId,
          imageUrl
        );

        if (oldBannerImage) {
          // dete oldPrdtImage
          deleteFiles([oldBannerImage], (err) => {
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
          updatedProduct: updatedBanner,
        });
      });
    } catch (error) {
      console.error("Error handling Image upload:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BannerController();
