import express from 'express';
import { sendMessages, getMessages} from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router();

router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessages)

export default router;