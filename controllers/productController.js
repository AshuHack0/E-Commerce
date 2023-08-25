import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";
   
export const createProductController = async(req, res) => {

    try {
        const { name, slug, description, price, category, quantity, shipping, orginalPrice, productDetail } = req.fields; // req.body ni hoga kyuki fs model use kar rege photo bhi upload karne k liye
        const { photo } = req.files;
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        if (!description) {
            return res.status(401).send({ message: "description is required" })
        }
        if (!price) {
            return res.status(401).send({ message: "price is required" })
        }
        if (!category) {
            return res.status(401).send({ message: "category is required" })
        }
        if (!quantity) {
            return res.status(401).send({ message: "quantity is required" })
        }
        if (!photo) {
            return res.status(401).send({ message: "photo is required and should be less than 1mb" })
        }
        if (!shipping) {
            return res.status(401).send({ message: "shipping is required" })
        }
        if (!productDetail) {
            return res.status(401).send({ message: "productDetail is required" })
        }
        if (!orginalPrice) {
            return res.status(401).send({ message: "orginal price is required" })
        }
        const products = new productModel({...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error while creating Product",
            success: false,
            error
        })
    }
}


// get all the products 

export const getProductController = async(req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "all products details fetched",
            countTotal: products.length,
            products

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting product detail",
            error
        })
    }
}


export const getSingleProducts = async(req, res) => {
    try {
        const products = await productModel.find({ slug: req.params.slug }).select("-photo").limit(12).sort({ createdAt: -1 }).populate("category");
        res.status(200).send({
            success: true,
            message: "single product fetch successfull",
            countTotal: products.length,
            products

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting product detail",
            error
        })
    }
}



export const productPhotoController = async(req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "error while getting the product photo",
                error,
                success: false
            })
    }
}

export const deleteProductController = async(req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success: true,
            message: "Prouduct delete successfully "
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                message: "error while  delleting the product",
                error,
                success: false
            })
    }
}

// update product controller 
export const updateProductController = async(req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping, orginalPrice, productDetail } = req.fields; // req.body ni hoga kyuki fs model use kar rege photo bhi upload karne k liye
        const { photo } = req.files

        const { pid } = req.params;
        const products = await productModel.findByIdAndUpdate(pid, { name, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Updation successfull",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error while updating Product",
            success: false,
            error
        })
    }
}

export const productFilterController = async(req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: "product fetched successfull",
            products

        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error
        })
    }
}

export const prouductCountController = async(req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "product count successfull",
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error While couting Products",
            error
        })

    }
}

// cosnt list base on page 
export const productListController = async(req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error while prouduct per page dispaly",
            error
        })

    }
}  


// search Product Contrroler 
export const serachProductController = async(req, res) =>{
      try {
          const {keyword} = req.params;
          const result = await productModel.find({
            $or: [
                {name:{ $regex:keyword , $options:"i"}}, 
                {description : { $regex:keyword , $options:"i"}},
            ],
          })
          .select("-photo");  
          res.json(result)
      } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false, 
            message:"error while search the product", 
            error
        })
      }
}