import { Router } from "express";
import { login, signup } from "../controllers/accountController.js";


const router = Router();

//login
router.post('/login', login);

//signup
router.post('/signup',signup);

export default router;