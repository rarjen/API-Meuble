const router = require("express").Router();
const ongkir = require("../controllers/checkCost");
const authorize = require("../middlewares/authorize");

router.post("/check", authorize(), ongkir.ongkir);

module.exports = router;
