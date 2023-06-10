const router = require("express").Router();
const productRating = require("../controllers/productRating");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post(
  "/create",
  authorize([ROLES.BUYER, ROLES.ADMIN]),
  productRating.create
);

module.exports = router;
