import {Router} from "express"
import { splitByPercentage, splitEqually,splitByExactAmount } from "../controllers/spliting.controller.js";

const router = Router();


router.route('/SplitEqually').post(splitEqually);
router.route('/splitByPercentage').post(splitByPercentage)
router.route('/splitByExactAmount').post(splitByExactAmount)


export default router