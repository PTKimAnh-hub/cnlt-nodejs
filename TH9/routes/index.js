const express = require("express");
const router = express.Router();

const requireLogin = require("../middleware/requireLogin");

router.get("/", requireLogin, (req, res) => {
    res.json({ message: "Bạn đã đăng nhập" });
});

module.exports = router;
