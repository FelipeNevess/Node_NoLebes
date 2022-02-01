const services = require('../../services/products/index');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await services.create(name, quantity);

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  res.status(201).json(result);
}

const getAllProducts = async (_req, res) => {
  const result = await services.getAll();

  return res.status(200).json(result);
};


module.exports = {
  createProduct,
  getAllProducts,
};
