module.exports = () => {
  return (req, res, next) => {
    console.log(`${Date.now()} ${req.method} ${req.url}`);
    next();
  };
};
