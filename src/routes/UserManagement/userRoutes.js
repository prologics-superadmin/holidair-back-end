// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserManagement/UserController");
const auth = require("../../middlewares/jwtMiddleware");
const readUser = require("../../middlewares/permission/User/readUser");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", auth, UserController.logout);
router.post("/get-all", UserController.getAllUsers);
router.post("/get-hierarchy", UserController.getHierarchy); // new
router.post("/export-csv", () => {});
router.get("/me", auth, UserController.getMe);
router.get("/get/:id", UserController.getUserById);
router.patch("/update/:id", UserController.updateUser);
router.post("/reset-password/request", UserController.requestPasswordReset);
router.post("/reset-password/verify", UserController.verifyOTP);
router.post("/reset-password/reset", UserController.resetPassword);
router.post("/hierarchy-search", UserController.hiracySearch);

module.exports = router;
