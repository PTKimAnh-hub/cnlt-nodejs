const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/studentController");
const requireLogin = require("../middleware/requireLogin");

router.use(requireLogin);

router.get("/", ctrl.getAll);
router.get("/stats", ctrl.stats);
router.get("/stats/class", ctrl.statsByClass);

router.get("/heavy-sync", ctrl.heavySync);
router.get("/heavy-async", ctrl.heavyAsync);

router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
