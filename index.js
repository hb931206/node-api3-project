// code away!
const express = require("express");
const login = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();

server.use(login());
server.use(userRouter);

const port = 3500;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
