const router = require("express").Router();
const saleOrder = require("../controllers/saleOrder");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/", authorize(ROLES.ADMIN), saleOrder.index);

module.exports = router;
