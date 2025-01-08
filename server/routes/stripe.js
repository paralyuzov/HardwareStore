require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const User = require('../models/User');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/', async (req, res) => {
    try {
      const { items,userId } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty items array' });
      }
  
      console.log('Items received:', items);
  
      const lineItems = items.map((item) => {
        if (!item.name || !item.price || !item.quantity || !item.image) {
          throw new Error(`Item data missing: ${JSON.stringify(item)}`);
        }
  
        return {
            price_data: {
              currency: 'usd',
              product_data: { 
                name: item.name, 
                images: [item.image]
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          };
      });
  
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      const saveOrder = async () => {
        const user = await User.findById(userId);
        if (!user) {
          console.error('User not found');
          return;
        }
  
        const orders = items.map((product) => ({
            productId: product.id,
            productName: product.name,
            quantity: product.quantity,
            price: product.price,
          }));
  
        user.orders.push(...orders);
        await user.save();
        console.log('Orders saved to user account');
      };
  
      res.status(200).json({ id: session.id });
      saveOrder();
    } catch (error) {
      console.error('Error creating checkout session:', error.message || error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

module.exports = router;