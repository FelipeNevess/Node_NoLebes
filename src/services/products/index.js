const models = require('../../models/products/index');
const verifyInfos = require('../../utils/mistakes');

const create = async (name, quantity) => {
  // const checkProduct = await verifyNameExists(name);
  const checkErrorName = verifyInfos.verifyInfosName(name);
  const checkErrorQuantity = verifyInfos.verifyInfosQuantity(quantity);

  switch (true) {
    // case checkProduct !== undefined:
    //   return { code: 409, message: 'Product already exists' };
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

module.exports = {
  create,
  getAll
};
