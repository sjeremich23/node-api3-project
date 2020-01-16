module.exports = (req, res, next) => {
  const { body } = req;

  if (!Object.keys(body).length > 0) {
    res.status(400).json({ errorMessage: "missing post data" });
  } else if (!body.text) {
    res.status(400).json({ errorMessage: "missing required text field" });
  } else {
    next();
  }
};
