const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    console.log('Received userId:', userId);

    const user = await User.findById(userId).select('orders').lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;