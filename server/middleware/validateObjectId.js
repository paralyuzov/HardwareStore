const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Item not found!" });
  }

  next();
};

module.exports = validateObjectId;