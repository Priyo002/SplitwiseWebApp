import {Router} from "express"
import { logInUser, logOutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();


router.route('/register').post(registerUser);
router.route('/login').post(logInUser)
router.route('/logout').post(logOutUser)



export default router