const express = require("express");
const Joi = require("Joi");
const router = express.Router();

const createErrorObject = require("../../utils/createErrorObject");
const objectId = require("../../schemas/utils");
const Exercise = require("../../models/Exercise");

// @route GET api/exercise
// @desc Get all exercises
// @access Private
router.get("/", (req, res, next) => {
  Exercise.find({})
    .then(exercises => res.json(exercises))
    .catch(next);
});

// @route GET api/exercise/:id
// @desc Get exercise by id
// @access Private
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { error } = objectId.validate(id);

  if (error) {
    return res
      .status(404)
      .json(createErrorObject(["No exercise with this ID"]));
  }

  Exercise.find({ _id: id })
    .then(exercises => res.json(exercises))
    .catch(next);
});

module.exports = router;
