module.exports = (req, res, next) => {
  const itemsSold = [...req.body];

  itemsSold.forEach((e) => {
    const columns = Object.keys(e);
    if (!columns.includes('quantity')) {
      return res.status(400).json({ message: '"quantity" is required' });
    } 
    if (!columns.includes('productId')) {
      return res.status(400).json({ message: '"productId" is required' });
    } 
  });

  return next();
};
