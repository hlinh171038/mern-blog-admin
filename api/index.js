import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//models
import UserModel from './models/User.js'
const app= express();
const salt = 10;
const secret = 'bvfdjjdshkdk'
mongoose.connect('mongodb+srv://blogadmin:vofghfTVKuffhdW0@cluster0.xo15b4l.mongodb.net/?retryWrites=true&w=majority')

// middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
//method get
app.get("/",(req,res)=>{
    res.send('get method send hello world')
})
app.post('/registry',async(req,res)=>{
    const{username,password} = req.body;
    try {
        const userDoc = await UserModel.create({
            username,
            password:bcrypt.hashSync(password,salt)})
        res.status(200).json(userDoc)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    try {
        const userDoc = await UserModel.findOne({username});
        const passOk = bcrypt.compareSync(password,userDoc.password)
        if(passOk === true){
            // login
            jwt.sign({username,id:userDoc._id}, secret,{},(err,token)=>{
                if(err) throw err;
                // set cookie
                res.cookie('token',token).json('ok');
            })
        }else{
            res.status(404).json('Wrong to login')
            
        }
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// app listen
app.listen(5000,()=>{
    console.log('this api running in port 5000')
})