import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";
export const createCategoryController = async(req, res) => { 
     // hellow 
    try {
        const { name } = req.body;
        if (!name) { 
            return res.status(401).send({ message: "Name is required" })
        }

        const existingCategory = await CategoryModel.findOne({ name: name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "category Already Exists"
            })
        }
        const category = await new CategoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }

};


export const updateCategoryController = async(req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while updating category"
        })
    }
}


// get all category 
export const getcategoryController = async(req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            message: "All category List",
            success: true,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "error while getting all the category",
            success: false,
            error
        })
    }
}


//get single category 
export const singlecategoryController = async(req, res) => {
    try {
        // const { slug } = req.params   //same thind in neeche wala findone ka bracket
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            message: "Single category list",
            success: true,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "error while getting single category",
            success: false,
            error
        })
    }
}

//delete category 

export const deleteCategoryController = async(req, res) => {
    try {
        const { id } = req.params //same thind in neeche wala findone ka bracket
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "Single category deleted",
            success: true

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "error while  deleting  single category",
            success: false,
            error
        })
    }
}