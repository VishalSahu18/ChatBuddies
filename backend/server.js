// const express = require('express');
// const dotenv = require('dotenv');
import path from "path";
import express from "express";// for using the import we have to add "type":"module" in package.json file
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js'
import MessageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
import connectToMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

import { app ,server } from "./socket/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();



app.use(express.json());//to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",MessageRoutes);
app.use("/api/users",userRoutes);


app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})




server.listen(PORT,() => {

    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});








