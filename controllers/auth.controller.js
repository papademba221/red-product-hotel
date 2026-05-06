const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si existe
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Utilisateur existe déjà' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer user
    user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Utilisateur créé ✅' });

  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    // Vérifier password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    // Générer token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json(error);
  }
};