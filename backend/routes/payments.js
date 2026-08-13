import express from 'express';
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Crear intención de pago (Stripe)
router.post('/create-intent', protect, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para pagar esta orden' });
    }

    // Aquí irá la integración con Stripe
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(order.total * 100),
    //   currency: 'mxn',
    //   metadata: { orderId: order._id.toString() }
    // });

    res.status(200).json({
      success: true,
      message: 'Intención de pago creada (Stripe por configurar)'
      // clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirmar pago
router.post('/confirm', protect, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    order.paymentStatus = 'completed';
    order.stripePaymentId = paymentId;
    order.status = 'processing';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Pago confirmado exitosamente',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook de Stripe (para recibir eventos)
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // Aquí irá la lógica del webhook de Stripe
  res.json({ received: true });
});

export default router;