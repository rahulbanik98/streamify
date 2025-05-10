import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { authPathes } from "../utils/routes.pathes.js";

const router = express.Router();
const { pathLogin, pathLogout, pathSignup } = authPathes;

router.post(pathSignup, signup);
router.post(pathLogin, login);
router.post(pathLogout, logout);

export default router;
