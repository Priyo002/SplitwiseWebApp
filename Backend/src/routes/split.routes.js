import {Router} from "express"
import { splitByPercentage, splitEqual } from "../controllers/spliting.controller.js";

const router = Router();


router.route('/SplitEqual').post(splitEqual);
router.route('/splitByPercentage').post(splitByPercentage)


export default router