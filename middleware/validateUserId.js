const Users = require("../api/users/userDb");

module.exports = (req, res, next) => {
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ errorMessage: "invalid user ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        err,
        Error:
          "The user information could not be retrieved.  It's not you, it's me"
      });
    });
};
