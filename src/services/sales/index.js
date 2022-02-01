const models = require('../../models/sales/index');
const modelsProduct = require('../../models/products/index');

const ferifyingProductAround = async (id) => {
  const result = await modelsProduct.getById(id);

  return result;
};

const salesProduct = async (array) => Promise.all(
  array.map(async (item) => {
    const [result] = await ferifyingProductAround(item.product_id);

    return result;
  }),
);

const create = async (array) => {
  const response = await salesProduct(array);
  const filteredItemId = response.some((item) => item === undefined);

  if (filteredItemId) {
    return { code: 404, message: 'Product_id not found' };
  }

  const verifyArray = await models.verifyProducts(array);
  const filteredItemQuantity = verifyArray
    .some((arr, i) => arr
      .some(({ quantity }) => array[i].quantity > quantity));

  if (filteredItemQuantity) {
    return { code: 422, message: 'Such amount is not permitted to sell' };
  }

  const result = await models.create(array);

  await models.updateQuantityAdd(result);

  return result;
};

const getAll = async () => {
  const result = await models.getAll();

  return result;
};

const getById = async (id) => {
  const result = await models.getById(id);

  if (result.length === 0) {
    return { code: 404, message: 'Sale not found' };
  }

  return result;
};

const update = async (id, array) => {
  const response = await models.getById(id);

  if (response.length === 0) {
    return { code: 404, message: 'Sale not found' };
  }

  const result = await models.update(id, array);

  return result;
};

const remove = async (id) => {
  const getProduct = await getById(id);

  if (getProduct.message) {
    return getProduct;
  }

  await models.remove(id);
  await models.updateQuantityRemove(getProduct);

  return getProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
