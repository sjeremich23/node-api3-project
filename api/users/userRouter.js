const router = require("express").Router();
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const validateUserId = require("../../middleware/validateUserId");
const validateUser = require("../../middleware/validateUser");
const validatePost = require("../../middleware/validatePost");

router.post("/", validateUser, (req, res) => {
  const { body } = req;

  Users.insert(body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "The User information could not be saved to database.  It's not you, it's me"
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const newPost = { ...body, user_id: id };

  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: "The post could not be saved to database.  It's not you, it's me"
      });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json({
        err,
        error:
          "The User information could not be retrieved.  It's not you, it's me"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getById(id)
    .then(users => {
      users
        ? res.status(200).json({ users })
        : res.status(404).json({
            error: `The user with id:${id} does not exist`
          });
    })
    .catch(err => {
      res.status(505).json({
        err,
        error: `The user ${id} could not be retrieved.  It's not you, it's me`
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      if (!posts.length > 0) {
        res.status(400).json({ errorMessage: "This user has no posts" });
      } else {
        res.status(200).json({ posts });
      }
    })
    .catch(err => {
      res
        .status(400)
        .json({ err, error: "Cannot access Posts from database." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.remove(id).then(() => {
    res.status(200).json({ message: `User id of ${id} successfully deleted.` });
  });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Users.update(id, body).then(name => {
    res
      .status(200)
      .json({ message: `User ${id} was successfully updated to ${body.name}` });
  });
});

module.exports = router;
