const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/auth");
const { createOrUpdateUser } = require("../controllers/auth");
const { auth } = require("firebase-admin");
const middleWare = (req, res, next) => {
  console.log("i amm middleware");
  next();
};
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.get("/testing", middleWare, (req, res) => {
  res.json({
    data: "successfullllllllllllll",
  });
});
module.exports = router;
