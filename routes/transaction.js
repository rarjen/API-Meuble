const router = require("express").Router();
const transaction = require("../controllers/transaction");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.get("/all-transactions", authorize(ROLES.ADMIN), transaction.indexAdmin);
router.put("/cancel/:transaction_id", authorize(), transaction.cancel);
router.put("/resi/:transaction_id", authorize(), transaction.resi);
router.put(
  "/update/:transaction_id",
  authorize(ROLES.ADMIN),
  transaction.update
);
router.post("/create", authorize(ROLES.BUYER), transaction.create);
router.get("/", authorize(ROLES.BUYER), transaction.indexAdmin);

module.exports = router;
