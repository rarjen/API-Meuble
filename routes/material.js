const router = require("express").Router();
const material = require("../controllers/material");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/create", authorize(ROLES.ADMIN), material.create);
router.put("/status/:material_id", authorize(ROLES.ADMIN), material.destroy);
router.put("/edit/:material_id", authorize(ROLES.ADMIN), material.update);
router.get(
  "/all-materials",
  authorize([ROLES.ADMIN, ROLES.BUYER]),
  material.index
);
router.get("/:material_id", authorize(), material.show);

module.exports = router;
