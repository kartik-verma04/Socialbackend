const { getauser, getAllUser, addFreind, getAllFreinds, getafreind } = require("../controllers/users")
const verify = require("../middlewares/verifyToken")

const router = require("express").Router()

router.get('/get/:id',verify,getauser)
router.get('/get/all',verify,getAllUser)
router.put('/addfreind/:id',verify,addFreind)
router.get('/getfreind',verify,getafreind)
router.get('/getallfreinds',verify,getAllFreinds)

module.exports = router;


