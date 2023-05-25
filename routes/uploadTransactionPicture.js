const router = require("express").Router();
const uploadTransactionPicture = require("../controllers/uploadTransactionPicture");
const mediaValidation = require("../utils/media/media-validation");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post(
  "/",
  authorize(ROLES.BUYER),
  mediaValidation.image.single("picture"),
  uploadTransactionPicture.upload
);

module.exports = router;
