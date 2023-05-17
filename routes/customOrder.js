const router = require("express").Router();
const customOrder = require("../controllers/customOrder");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(), customOrder.create);
router.get(
  "/all-custom-orders",
  authorize(ROLES.ADMIN),
  customOrder.readCustomOrderByAdmin
);
router.get(
  "/custom-orders",
  authorize(ROLES.BUYER),
  customOrder.readCustomOrderByUser
);
router.put(
  "/:custom_order_id",
  authorize(ROLES.BUYER),
  customOrder.cancelOrderByUser
);
router.put(
  "/cancel-order/:custom_order_id",
  authorize(ROLES.ADMIN),
  customOrder.cancelOrderByAdmin
);

module.exports = router;
