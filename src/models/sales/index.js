const connection = require('../connection');

const verifyProducts = async (quant) => {
  const query = `
    SELECT * FROM products
    WHERE id = ?
  `;

  const response = await Promise.all(quant.map(async ({ product_id: productId }) => {
    const [result] = await connection.execute(query, [productId]);

    return result;
  }));

  return response;
};

const removeDateSales = async (id) => {
  const query = `
    DELETE FROM sales
    WHERE id = ?
  `;

  await connection.execute(query, [id]);
};

const updateQuantityAdd = async (quant) => {
  const query = `
    UPDATE products
      SET quantity = quantity - ?
    WHERE id = ?
  `;
  await Promise.all(quant.itemsSold.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(query, [quantity, productId]);
  }));
};

const updateQuantityRemove = async (quant) => {
  const result = await quant;
  const query = `
    UPDATE products
      SET quantity = quantity + ?
    WHERE id = ?
  `;
  await Promise.all(result.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(query, [quantity, productId]);
  }));
};

const create = async (array) => {
  const queryDate = 'INSERT INTO sales(date) VALUES(NOW());';

  const [insertDate] = await connection.execute(queryDate);

  await Promise.all(array.map(async ({ product_id: productId, quantity }) => {
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);';

    await connection.execute(query, [insertDate.insertId, productId, quantity]);
  }));

  return {
    id: insertDate.insertId,
    itemsSold: array,
  };
};

const getAll = async () => {
  const query = `
    SELECT
      SP.sale_id AS saleId,
      S.date AS date,
      SP.product_id AS product_id,
      SP.quantity AS quantity
    FROM sales_products AS SP
    INNER JOIN sales AS S
      ON SP.sale_id = S.id;
  `;

  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = `
    SELECT
      S.date,
      SP.product_id,
      SP.quantity
    FROM sales_products AS SP
    INNER JOIN sales AS S
      ON SP.sale_id = S.id
    WHERE SP.sale_id = ?;
  `;

  const [result] = await connection.execute(query, [id]);
  return result;
};

const update = async (id, array) => {
  const query = `
    UPDATE sales_products
      SET quantity = ?, product_id = ?
    WHERE sale_id  = ?;
  `;

  await Promise.all(array.map(async ({ quantity, product_id: productId }) => {
    await connection.execute(query, [quantity, productId, id]);
  }));

  return {
    saleId: id,
    itemUpdated: array,
  };
};

const remove = async (id) => {
  await removeDateSales(id);

  const query = `
    DELETE FROM sales_products
    WHERE sale_id = ?;
  `;

  await connection.execute(query, [id]);
};


module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,

  verifyProducts,
  updateQuantityAdd,
  updateQuantityRemove
};
