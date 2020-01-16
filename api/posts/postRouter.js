const router = require("express").Router();
const Posts = require("../posts/postDb");

const validatePostId = require("../../middleware/validatePostId");
const validatePost = require("../../middleware/validatePost");

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "The Posts could not be retrieved.  It's not you, it's me"
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.getById(id)
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(505).json({
        err,
        error: `Post ${id} could not be retrieved.  It's not you, it's me`
      });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.remove(id).then(() => {
    res.status(200).json({ message: `Post id of ${id} successfully deleted.` });
  });
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Posts.update(id, body).then(() => {
    res
      .status(200)
      .json({ message: `Post ${id} was successfully updated to ${body.text}` });
  });
});

module.exports = router;
