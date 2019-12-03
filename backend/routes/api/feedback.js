const express = require("express");
const router = express.Router();

// @route POST api/feedback/history/error
// @desc Post error
// @access Private
router.post("/history/error", async (req, res) => {
  const { body } = req;
  const { err } = body;
  console.log({ err, date: new Date(), on: "history" });
  res.status(200).json({ message: "success" });
});

router.post("/plan/error", async (req, res) => {
  const { body } = req;
  const { err } = body;
  console.log({ err, date: new Date(), on: "plan" });
  res.status(200).json({ message: "success" });
});

module.exports = router;
