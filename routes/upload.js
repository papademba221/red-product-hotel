const express = require("express");
const router = express.Router();
const upload = require("../config/multerCloudinary");

// upload d’une seule image
router.post("/image", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload réussi",
      url: req.file.path, // lien Cloudinary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;