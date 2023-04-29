const router = require("express").Router();
const payment = require("../controllers/payment");
const authorize = require("../middlewares/authorize");
const mediaValidation = require("../utils/media/media-validation");
const { ROLES } = require("../utils/enum");

router.post(
  "/create",
  authorize(ROLES.ADMIN),
  mediaValidation.image.single("picture"),
  payment.create
);
router.put(
  "/edit/:payment_id",
  authorize(ROLES.ADMIN),
  mediaValidation.image.single("picture"),
  payment.update
);
router.get("/", authorize(), payment.index);
router.get("/:payment_id", authorize(), payment.show);
router.delete("/:payment_id", authorize(ROLES.ADMIN), payment.destroy);

module.exports = router;
