const Posts = require("../api/posts/postDb");

module.exports = (req, res, next) => {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(400).json({ errorMessage: "invalid post ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        err,
        Error: "The post could not be retrieved.  It's not you, it's me"
      });
    });
};
