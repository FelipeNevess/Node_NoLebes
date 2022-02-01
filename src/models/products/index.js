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


module.exports = {
  create,
  getAll
}
