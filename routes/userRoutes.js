import express from 'express';
import { getuserController, userDelete } from '../controllers/userController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/get-users', getuserController)

// delete the routes
router.delete('/user-delete/:id', requireSignIn, isAdmin, userDelete)

export default router;