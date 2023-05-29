const router = require("express").Router();
const uploadProductPicture = require("../controllers/uploadProductPicture");
const mediaValidation = require("../utils/media/media-validation");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post(
  "/",
  authorize(ROLES.ADMIN),
  mediaValidation.image.array("picture"),
  uploadProductPicture.upload
);

router.post(
  "/thumbnail",
  authorize(ROLES.ADMIN),
  mediaValidation.image.single("picture"),
  uploadProductPicture.uploadThumbnail
);

module.exports = router;
