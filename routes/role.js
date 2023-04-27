const router = require("express").Router();
const role = require("../controllers/owner/role");

router.post("/create", role.create);
router.get("/get", role.index);

module.exports = router;
