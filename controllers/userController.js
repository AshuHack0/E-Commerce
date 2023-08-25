 import userModel from '../models/userModel.js';
 export const getuserController = async(req, res) => {
     try {
         const users = await userModel.find({});
         res.status(200).send({
             message: "users find succsfull",
             success: true,
             users
         })

     } catch (error) {
         console.log(error)
         res.status(500).send({
             message: "  error in userConroller",
             success: false,
             error
         })
     }
 }

 export const userDelete = async(req, res) => {
     try {
         await userModel.findByIdAndDelete(req.params.id)
         res.status(200).send({
             message: "user Deleted Succesfully",
             success: true
         })
     } catch (error) {
         console.log(error)
         res.status(500).send({
             message: "something error while delting the user",
             success: false,
             error
         })
     }
 }