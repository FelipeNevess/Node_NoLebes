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

const getByIdProduct = async (req, res) => {
  const { id } = req.params;

  const result = await services.getById(Number(id));

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result[0]);
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await services.update(Number(id), name, quantity);

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const result = await serviceProduct.removeProduct(Number(id));

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result[0]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getByIdProduct,
  productUpdate,
  removeProduct
};
