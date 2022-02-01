const models = require('../../models/products/index');
const verifyInfos = require('../../utils/mistakes');

const verifyNameExists = async (name) => {
  const result = await models.getAll();

  const filteredName = result.find((item) => item.name === name);

  return filteredName;
};

const verifyIdExists = async (id) => {
  const result = await models.getAll();

  const filteredName = result.filter((item) => Number(item.id) === Number(id));

  return filteredName;
};

const create = async (name, quantity) => {
  const checkProduct = await verifyNameExists(name);
  const checkErrorName = verifyInfos.verifyInfosName(name);
  const checkErrorQuantity = verifyInfos.verifyInfosQuantity(quantity);

  switch (true) {
    case checkProduct !== undefined:
      return { code: 409, message: 'Product already exists' };
    case checkErrorName.message:
      return checkErrorName;
    case checkErrorQuantity.message:
      return checkErrorQuantity;
    default:
      break;
  };

  const result = await models.create(name, quantity);

  return result;
};

const getAll = async () => {
  const result = await models.getAll();

  return result;
};

const getById = async (id) => {
  const result = await models.getById(id);

  if (result.length === 0) {
    return { code: 404, message: 'Product not found' };
  }

  return result;
};

const update = async (id, name, quantity) => {
  const responseVerify = await verifyIdExists(id);
  const checkErrorName = verifyInfos.verifyInfosName(name);
  const checkErrorQuantity = verifyInfos.verifyInfosQuantity(quantity);

  switch (true) {
    case responseVerify.length === 0:
      return { code: 404, message: 'Product not found' };
    case checkErrorName.message:
      return checkErrorName;
    case checkErrorQuantity.message:
      return checkErrorQuantity;
  };

  const result = await models.update(id, name, quantity);

  return result;
};

const remove = async (id) => {
  const responseVerify = await verifyIdExists(id);

  if (responseVerify.length === 0) {
    return { code: 404, message: 'Product not found' };
  }

  await models.remove(id);

  return responseVerify;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};
