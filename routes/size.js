const router = require("express").Router();
const size = require("../controllers/size");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), size.create);
router.put("/:size_id", authorize(ROLES.ADMIN), size.destroy);
router.put("/edit/:size_id", authorize(ROLES.ADMIN), size.update);
router.get("/all-sizes", authorize([ROLES.ADMIN, ROLES.BUYER]), size.index);
router.get(
  "/size-categories/:category_id",
  authorize([ROLES.ADMIN, ROLES.BUYER]),
  size.readSizeByCategory
);
router.get("/:size_id", authorize([ROLES.ADMIN, ROLES.BUYER]), size.show);

module.exports = router;
