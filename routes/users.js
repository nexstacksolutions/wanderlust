import express from "express";
import passport from "passport";
import asyncWrap from "../middlewares/asyncWrap.js";
import { userSchema } from "../schema.js";
import { saveRedirectUrl, validateSchema } from "../middlewares/auth.js";
import { userController } from "../controllers/users.js";

const router = express.Router();

// Login routes
router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    asyncWrap(userController.loginUser)
  );

// Signup routes
router
  .route("/signup")
  .get(userController.signupForm)
  .post(validateSchema(userSchema), asyncWrap(userController.signupUser));

// Logout route
router.post("/logout", userController.logoutUser);

export { router as userRoutes };
