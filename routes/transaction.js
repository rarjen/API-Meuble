const router = require("express").Router();
const transaction = require("../controllers/transaction");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.BUYER), transaction.create);
router.get("/all-transactions", authorize(ROLES.ADMIN), transaction.indexAdmin);

module.exports = router;
