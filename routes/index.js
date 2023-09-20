const express = require("express");
const router = express.Router();
const userApi = require("./user.Api");
router.use("/user", userApi);

module.exports = router;
