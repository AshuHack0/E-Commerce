import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import JWT from "jsonwebtoken"

export const registerController = async(req, res) => { // ye callback funtion kyuki post method se req aayega and res submit hoga
    try {
        const { name, email, password, phone, address, question } = req.body
            // validation 
        if (!name) {
            return res.send({ message: "name is Required" })
        }
        if (!email) {
            return res.send({ message: "email is Required" })
        }
        if (!phone) {
            return res.send({ message: "phone is Required" })
        }
        if (!address) {
            return res.send({ message: "address is Required" })
        }
        if (!password) {
            return res.send({ message: "passwrod is Required" })
        }
        if (!password) {
            return res.send({ message: "passwrod is Question" })
        }

        //check user 
        const existingUser = await userModel.findOne({ email: email })

        // exiting user 
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            })
        }

        // rgister user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfull",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
};



// LOGIN 
export const loginController = async(req, res) => { //callback funtion hai so req or res hoga 
    try {
        const { email, password } = req.body;

        //validataion
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "email or password is wrong"
            })
        }
        // check  user
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registerd',
                error
            })
        }
        // password comparing
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "password is not correct"
            })
        }

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfull",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                question: user.question
            },
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

// forgot controller
export const forgotPasswordController = async(req, res) => {
    try {
        const { email, question, newpassword } = req.body;
        if (!email) {
            res.status(400).send({
                messsage: "email is required"
            })
        }
        if (!question) {
            res.status(400).send({
                messsage: "question is required"
            })
        }
        if (!newpassword) {
            res.status(400).send({
                messsage: "new password  is required"

            })
        }
        // check
        const user = await userModel.findOne({ email: email });
        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "wrong Email or Answer"
            })
        }

        const hashed = await hashPassword(newpassword);
        const passwordChanged = await userModel.findByIdAndUpdate(user._id, { password: hashed })
        if (!passwordChanged) {
            return res.status(404).send({
                success: false,
                message: "Password not changed successfully !try after sometime "
            })
        }
        res.status(200).send({
            success: true,
            message: "password changed successfull",

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong ",
            error
        })
    }
}


// test controller
export const testController = (req, res) => {
    res.send("proteced routes")
}