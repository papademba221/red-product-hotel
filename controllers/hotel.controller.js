const Hotel = require("../models/hotel.model");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fonction utilitaire : upload buffer → Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "hotels" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ➕ Ajouter un hôtel
exports.createHotel = async (req, res) => {
  try {
    console.log("BODY REÇU:", req.body);

    const { nom, adresse, email, telephone, prix, devise } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = {
        url: result.secure_url,
        public_id: result.public_id,   // ← on sauvegarde l'identifiant Cloudinary
      };
    }

    const hotel = new Hotel({
      nom,
      adresse,
      email,
      telephone,
      prix,
      devise,
      image: imageUrl,   // objet { url, public_id }
    });

    await hotel.save();

    res.status(201).json({
      message: "Hôtel créé",
      hotel,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// 📥 Récupérer tous les hôtels
exports.getHotels = async (req, res) => {
  try {

    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.json(hotels);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};

// 📥 Récupérer un seul hôtel
exports.getHotelById = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        message: "Non trouvé"
      });
    }

    res.json(hotel);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};

// ✏️ Modifier un hôtel
exports.updateHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Hôtel modifié",
      hotel
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
};

// ❌ Supprimer un hôtel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hôtel non trouvé" });
    }

    // Supprime l'image sur Cloudinary avant de supprimer le document
    if (hotel.image?.public_id) {
      await cloudinary.uploader.destroy(hotel.image.public_id);
    }

    await Hotel.findByIdAndDelete(req.params.id);

    res.json({ message: "Hôtel supprimé" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};