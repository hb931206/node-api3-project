const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser(), (req, res, next) => {
  console.log(req.body);
  db.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error adding the user to the database.",
      });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res, next) => {
  // do your magic!
  db.get(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validatePost(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.delete("/:id", validateUserId(), (req, res, next) => {
  // do your magic!
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "Bye User",
        });
      } else {
        res.status(404).json({ message: "User couldn't be found" });
      }
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    db.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "User not found",
          });
        }
      })
      .catch(next);
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "Missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "Missing required name field" });
    } else {
      next();
    }
  };
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "Missing Post Data" });
    } else if (!req.text) {
      res.status(400).json({ message: "Missing Text Field" });
    } else {
      next();
    }
  };
  // do your magic!
}

module.exports = router;
