const router = require("express").Router();
const order = require("../controllers/order");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.BUYER), order.create);
router.put("/:order_id", authorize(ROLES.BUYER), order.cancel_order);
router.get("/all-orders", authorize(ROLES.ADMIN), order.adminRead);
router.get("/", authorize(ROLES.BUYER), order.userRead);

module.exports = router;
