import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Obtener perfil del usuario
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: user.getPublicData()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar perfil del usuario
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, preferences } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (preferences) updates.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      user: user.getPublicData()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cambiar contraseña
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Por favor completa todos los campos' });
    }

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatch = await user.matchPassword(currentPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener dirección del usuario
router.get('/address', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      address: user.address || {}
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar dirección del usuario
router.put('/address', protect, async (req, res) => {
  try {
    const { street, city, state, zipCode, country } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        address: {
          street,
          city,
          state,
          zipCode,
          country
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      address: user.address
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;