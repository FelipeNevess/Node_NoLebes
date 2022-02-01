const verifySalesBody = (req, res, next) => {
  const array = req.body;

  if (!array.find(({ product_id: productId }) => productId)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }

  if (array.some(({ quantity }) => !quantity && quantity !== 0)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const verifySalesQuantity = (req, res, next) => {
  const array = req.body;

  if (array.some(({ quantity }) => Number(quantity) <= 0 || typeof quantity === 'string')) {
    return res
      .status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  verifySalesBody,
  verifySalesQuantity,
};
