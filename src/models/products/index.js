const connection = require('../connection');

const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES(?, ?);';

  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);

  return result;
};

const update = async (id, name, quantity) => {
  const query = `
    UPDATE products
      SET name = ?, quantity = ?
    WHERE id = ?;
  `;

  await connection.execute(query, [name, quantity, id]);

  return {
    id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?;';

  await connection.execute(query, [id]);

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
}
