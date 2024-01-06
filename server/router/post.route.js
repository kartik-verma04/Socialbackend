const { uploadpost, getAllPost, deletePost, likePost, getApost } = require("../controllers/posts");
const verify = require("../middlewares/verifyToken");

const router = require("express").Router()

router.post("/addpost",verify,uploadpost)
router.get("/get/:id",verify,getApost)
router.delete("/delete/:id",verify,deletePost)
router.put("/like/:id",verify,likePost)
router.get('/all',verify,getAllPost)

module.exports = router;