import express from 'express';
import { createProductController, deleteProductController, getProductController, getSingleProducts, productFilterController, productListController, productPhotoController, prouductCountController, serachProductController, updateProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable'; // this is used for uploding photo
const router = express.Router();

//routes 
//create routes 
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update routes 
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// get products 
router.get('/get-product', getProductController)

// get single products 
router.get('/get-single-products/:slug', getSingleProducts)

// get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product 
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

//filter product

router.post('/product-filter', productFilterController)

// product count 
router.get('/product-count', prouductCountController)

// product per page 

router.get('/product-list/:page', productListController)   

// Search Product controller 
router.get('/search/:keyword' , serachProductController)
export default router;