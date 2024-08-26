import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import {
  ValidateUserSignupMW,
  ValidateUserSigninMW,
} from "../validators/user.validator.js";

const authRouter = express.Router();

authRouter.post("/signup", ValidateUserSignupMW, signUp);
authRouter.post("/signin", ValidateUserSigninMW, signIn);
authRouter.get("/signout", signOut);

export default authRouter;
