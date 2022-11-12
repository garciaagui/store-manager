module.exports = (req, res, next) => {
  const itemsSold = [...req.body];

  itemsSold.forEach((e) => {
    const keys = Object.keys(e);
    if (!keys.includes('quantity')) {
      return res.status(400).json({ message: '"quantity" is required' });
    } 
    if (!keys.includes('productId')) {
      return res.status(400).json({ message: '"productId" is required' });
    } 
  });

  return next();
};
