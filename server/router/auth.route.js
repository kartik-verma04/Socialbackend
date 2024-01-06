const { register, login, logOut } = require("../controllers/auth");

const router = require("express").Router();

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logOut)

module.exports = router;