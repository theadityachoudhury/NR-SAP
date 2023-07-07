const express = require('express');
const router = express.Router();
const { add, getAll,getOne } = require("../controllers/Stone/stone-controller");

router.post("/add", add);
router.get("/getAll", getAll);
router.get("/getOne/:id", getOne);

module.exports = router;


