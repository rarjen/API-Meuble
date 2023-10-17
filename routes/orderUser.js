const router = require("express").Router();
const orderUser = require("../controllers/orderUser");

router.post("/", orderUser.createMenu);

module.exports = router;
