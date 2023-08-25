// const express = require('express');
// const colors = require('colors');
import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
//configure env 
dotenv.config();

connectdb();

// rest object
const app = express();


//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//Routes
app.use("/api/v1/auth", authRoutes);


// category routes 
app.use("/api/v1/category", categoryRoutes);


// prouduct routes 
app.use("/api/v1/product", productRoutes);

// user routes 
app.use("/api/v1/user", userRoutes);


//rest api 
app.get('/', (req, res) => {
    res.send({
        message: "welcome to ecomnerce app "
    })
})


//port
const port = process.env.PORT;



//run listen
app.listen(port, () => {
    console.log(`server runing on port ${port}`.bgCyan.white);
});