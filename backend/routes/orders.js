import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Crear orden
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Por favor selecciona al menos un producto' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ error: 'Por favor completa la dirección de envío' });
    }

    // Calcular totales
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ error: `Producto ${item.productId} no encontrado` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
      }

      const itemTotal = product.getPriceWithDiscount() * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.getPriceWithDiscount(),
        quantity: item.quantity,
        subtotal: itemTotal
      });

      // Reducir stock
      product.stock -= item.quantity;
      await product.save();
    }

    const tax = subtotal * 0.16; // 16% IVA
    const shipping = subtotal > 500 ? 0 : 50; // Envío gratis si supera 500
    const total = subtotal + tax + shipping;

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener órdenes del usuario
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener orden específica
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user');

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // Verificar que el usuario es el dueño de la orden
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para ver esta orden' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de orden
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar esta orden' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;