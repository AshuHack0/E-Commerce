import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object 
const router = express.Router();

// routing 
//Register  || METHOD POST
router.post('/register', registerController);

// LOGIN || method POST
router.post('/login', loginController);

// forgot password 
router.post('/forgot-password', forgotPasswordController);

//test routes 
// router.get('/test', requireSignIn, isAdmin, testController); // bich mai kitne bhi middleware add kar skte hai  

//protected user route auth

router.get("/userauth", requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    });
});
// protected Admin Routh auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    });
});

export default router;