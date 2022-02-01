const services = require('../../services/sales/index');

const createSales = async (req, res) => {
  const array = req.body;

  const result = await services.create(array);

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(201).json(result);
};

const getAllSales = async (_req, res) => {
  const result = await services.getAll();

  return res.status(200).json(result);
};

const getBySaleId = async (req, res) => {
  const { id } = req.params;
  const result = await services.getById(id);

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const array = req.body;

  const result = await services.update(Number(id), array);

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;

  const result = await services.remove(Number(id));

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result);
};

module.exports = {
  createSales,
  getAllSales,
  getBySaleId,
  updateSales,
  deleteSales,
};
