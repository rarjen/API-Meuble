const router = require("express").Router();
const uploadReference = require("../controllers/uploadReferenceImg");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");
const mediaValidation = require("../utils/media/media-validation");

router.post(
  "/upload",
  authorize(ROLES.BUYER),
  mediaValidation.image.single("picture"),
  uploadReference.upload
);

module.exports = router;
