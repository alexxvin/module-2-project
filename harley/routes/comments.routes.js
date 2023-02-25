const router = require("express").Router();

const User = require("../models/User.model");
const Bike = require("../models/Bike.model");
const Comment = require("../models/Comment.model");

router.post("/bikes/:bikeId/comment", (req, res, next) => {
  const { bikeId } = req.params;
  const { author, content } = req.body;

  let user;
});
