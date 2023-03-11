const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  userSignUpSchema,
  userLoginSchema,
  subscriptionSchema,
  userVerifyEmailSchema
} = require("../../middlewares/userValidationMiddleware");
const {
  userSignUpController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionController,
  userAvatarController,
  userVerificationController,
  userSecondVerificationController
} = require("../../controllers/usersController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadMiddleware
} = require("../../middlewares/filesUploadMiddleware");

router.post("/signup", userSignUpSchema, asyncWrapper(userSignUpController));

router.post("/login", userLoginSchema, asyncWrapper(userLoginController));

router.post("/logout", authMiddleware, asyncWrapper(userLogoutController));

router.get("/current", authMiddleware, asyncWrapper(userCurrentController));

router.patch(
  "/",
  authMiddleware,
  subscriptionSchema,
  asyncWrapper(userSubscriptionController)
);

router.patch('/avatars', authMiddleware, uploadMiddleware.single("avatar"), asyncWrapper(userAvatarController));
router.post("/verify/:verificationToken", asyncWrapper(userVerificationController));
router.post("/verify/", userVerifyEmailSchema, asyncWrapper(userSecondVerificationController));


module.exports = { authRouter: router };
