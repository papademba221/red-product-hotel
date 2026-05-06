const Hotel = require("../models/hotel.model");

// ➕ Ajouter un hôtel
exports.createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: "Hôtel créé", hotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Récupérer tous les hôtels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Récupérer un seul hôtel
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Non trouvé" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.json({ message: "Hôtel modifié", hotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Supprimer un hôtel
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hôtel supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};