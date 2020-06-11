// code away!
const express = require("express");
const login = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(login());
server.use(userRouter);

const port = 3500;

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Whoops Something went wrong. Pleas try again later PT2	",
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
