const express = require("express");
const router = express.Router();
const user_controller = require('../../controllers/houseController');

router.post("/update",  user_controller.house_update);
router.get('/getAllHouses', user_controller.house_getAll);

module.exports = router;