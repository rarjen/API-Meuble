const router = require("express").Router();
const role = require("../controllers/role");

router.post("/create", role.create);

module.exports = router;
