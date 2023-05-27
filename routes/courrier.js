const router = require("express").Router();
const courrier = require("../controllers/courrier");
const authorize = require("../middlewares/authorize");
const mediaValidation = require("../utils/media/media-validation");
const { ROLES } = require("../utils/enum");

router.post(
  "/create",
  authorize(ROLES.ADMIN),
  mediaValidation.image.single("picture"),
  courrier.create
);
router.get("/all-courriers", authorize(ROLES.ADMIN), courrier.indexByAdmin);
router.put("/edit/:courrier_id", authorize(ROLES.ADMIN), courrier.update);
router.get("/", authorize(), courrier.indexByUser);

module.exports = router;
