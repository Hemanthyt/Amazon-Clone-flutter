const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/auth');
// Get all Category products
productRouter.get("/api/products", auth, async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports = productRouter;