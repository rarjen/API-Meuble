const router = require("express").Router();
const material = require("../controllers/material");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), material.create);
router.put("/:material_id", authorize(ROLES.ADMIN), material.destroy);
router.put("/edit/:material_id", authorize(ROLES.ADMIN), material.update);
router.get(
  "/all-materials",
  authorize([ROLES.ADMIN, ROLES.BUYER]),
  material.index
);
router.get(
  "/material-categories/:category_id",
  material.readMaterialByCategory
);
router.get("/:material_id", material.show);

module.exports = router;
