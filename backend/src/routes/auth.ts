import { Router } from "express";
import { isAuthPayloadValid, isEmailUsed, signIn, signUp, verifyEmail } from "../handlers/auth.ts";

const router = Router();

router.post("/sign-up", isAuthPayloadValid, isEmailUsed, signUp);
router.post("/sign-in", isAuthPayloadValid, signIn);
router.get("/verify-email", verifyEmail);

export default router;
