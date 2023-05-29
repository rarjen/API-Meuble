const router = require("express").Router();
const coordinate = require("../controllers/coordinate");
const authorize = require("../middlewares/authorize");

router.post("/create", authorize(), coordinate.create);

module.exports = router;
