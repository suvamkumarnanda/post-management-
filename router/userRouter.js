const {Router}=require("express");
const { addUser, fetchAll, fetchOne, updateUser, deleteUser, loginUser } = require("../controller/userController");

const router=Router();

router.post("/add",addUser);
router.get("/all",fetchAll);
router.get("/one/:id",fetchOne);
router.patch("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
router.post("/login",loginUser);
module.exports=router
