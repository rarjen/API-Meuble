const router = require("express").Router();
const ongkir = require("../controllers/checkCost");
const authorize = require("../middlewares/authorize");

router.post("/check", authorize(), ongkir.ongkir);
router.post("/check-cod", authorize(), ongkir.cod);

module.exports = router;
