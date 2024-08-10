const {Router}=require("express");
const { addPost, fetchALlPosts, fetchOne, updatePost, deletePost } = require("../controller/postController");
const { authenticate } = require("../middleware/auth");

const router=Router();
router.post("/add",authenticate, addPost);
router.get("/all",fetchALlPosts);
router.get("/one/:id",fetchOne);
router.patch("/update/:id",authenticate, updatePost);
router.delete("/delete/:id",authenticate, deletePost);
module.exports=router;