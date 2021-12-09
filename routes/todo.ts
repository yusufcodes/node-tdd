const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const todos = [
  {
    id: 1,
    name: "clean room",
    completed: false,
  },
];

// GET: /todos
router.get("/", function (req, res, next) {
  res.json(todos);
});

// GET: /todos/id
router.get("/:id", function (req, res, next) {
  const todoById = todos.find((todo) => todo.id === Number(req.params.id));
  if (!todoById) {
    return next(createError(404, "Not Found"));
  }
  res.json(todoById);
});

module.exports = router;
