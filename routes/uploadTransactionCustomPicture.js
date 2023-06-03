const router = require("express").Router();
const uploadTransactionCustomPicture = require("../controllers/uploadTransactionCustomPicture");
const mediaValidation = require("../utils/media/media-validation");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post(
  "/",
  authorize(ROLES.BUYER),
  mediaValidation.image.single("picture"),
  uploadTransactionCustomPicture.upload
);

module.exports = router;
