const express = require("express");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());
server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send({
    Server: "Hi, I'm your Server.  Can I start you off with a drink?"
  });
});

// custom middleware

function logger(req, res, next) {
  const { method, url } = req;
  console.log(
    `[${new Date().toLocaleTimeString()}] ${method} request to URL: ${url}`
  );
  next();
}

module.exports = server;
