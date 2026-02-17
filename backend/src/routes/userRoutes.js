const express = require("express");
const { signUp, loginIn, logOut } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginIn);
router.post("/logout", logOut);

module.exports = router;
