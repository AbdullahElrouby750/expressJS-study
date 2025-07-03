import { Router } from "express";
import { login, signup } from "../controllers/accountController.js";
import authenticateMiddleware from "../middleware/account/authenticateMiddleware.js";
import authorizeMiddleware from "../middleware/account/authorizeMiddleware.js";


const router = Router();

//login
router.post('/login', login);

//signup
router.post('/signup',signup);

//testing cookies
// router.get('/test',authenticateMiddleware, authorizeMiddleware(['admin']), (req, res, next)=>{
//     if(!req.user) 
//         res.status(404).json({message:'user not found'})
//     else 
//         res.json(req.user);
// })

export default router;