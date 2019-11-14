const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_controller = require('../../controllers/userController');
const authenticate = passport.authenticate('jwt', {session: false});

router.post("/register", user_controller.user_register);
router.post("/login",  user_controller.user_login);
router.post("/update",  authenticate, user_controller.user_update);
router.delete('/delete',  user_controller.user_delete);
router.get('/getUser', authenticate, user_controller.user_get);

module.exports = router;