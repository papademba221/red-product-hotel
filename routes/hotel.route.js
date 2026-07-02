const express = require("express");
const router = express.Router();
const multer = require("multer");
const hotelController = require("../controllers/hotel.controller");

// Multer en mémoire (pas de disque, on envoie direct à Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), hotelController.createHotel);
router.get("/", hotelController.getHotels);
router.get("/:id", hotelController.getHotelById);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;