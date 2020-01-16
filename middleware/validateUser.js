module.exports = (req, res, next) => {
  const { body } = req;

  if (!Object.keys(body).length > 0) {
    res.status(400).json({ errorMessage: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ errorMessage: "missing required name field" });
  } else {
    next();
  }
};
