const router = require("express").Router();
const customTransaction = require("../controllers/customTransaction");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(), customTransaction.create);
router.put(
  "/accept/:transaction_custom_order_id",
  authorize(ROLES.ADMIN),
  customTransaction.acceptOrder
);
router.put(
  "/edit/:transaction_custom_order_id",
  authorize(ROLES.ADMIN),
  customTransaction.editAdmin
);
router.put(
  "/edit-status-payment/:transaction_custom_order_id",
  authorize(ROLES.ADMIN),
  customTransaction.updatePayment
);
router.get(
  "/all-custom-transactions",
  authorize(ROLES.ADMIN),
  customTransaction.indexAdmin
);
router.get(
  "/custom-transactions",
  authorize(ROLES.BUYER),
  customTransaction.indexUser
);
router.get(
  "/:transaction_custom_order_id",
  authorize(),
  customTransaction.show
);
router.put(
  "/input-resi/:transaction_custom_order_id",
  authorize(ROLES.ADMIN),
  customTransaction.inputResiAdmin
);
router.put(
  "/cancel-order/:transaction_custom_order_id",
  authorize(ROLES.ADMIN),
  customTransaction.cancelAdmin
);
router.put(
  "/cancel/:transaction_custom_order_id",
  authorize(ROLES.BUYER),
  customTransaction.cancelUser
);

module.exports = router;
