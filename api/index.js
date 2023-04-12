import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  cookieParser  from 'cookie-parser'
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();
import multer from 'multer'
const uploadMiddleware = multer({ dest: 'uploads/' })

//models
import UserModel from './models/User.js'
import PostModal from './models/Post.js';
const app= express();
const salt = 10;
const secret = 'bvfdjjdshkdk'
mongoose.connect('mongodb+srv://blogadmin:vofghfTVKuffhdW0@cluster0.xo15b4l.mongodb.net/?retryWrites=true&w=majority')

// middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
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
                res.cookie('token',token).json({
                    username,
                    id:userDoc._id,
                });
            })
        }else{
            res.status(404).json('Wrong to login')
            
        }
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// get cookie
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
})
//log out
app.post('/logout',(req,res)=>{
    res.cookie('token', '').json('ok')
})
//post blog
app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{
    const {originalname,destination,filename,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length -1];
    const newPath = destination +filename+'.'+ext
    fs.renameSync(path,newPath)
    
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err) throw err;
        const {title,summary,content} = req.body
        const postDoc = await PostModal.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id
        })
        res.json(postDoc);
    })
    
})
// get info 
app.get('/post',async(req,res)=>{
    const postsDoc = await PostModal.find().populate('author')
    res.json(postsDoc)
})
// detail 
app.get('/post/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const postId = await PostModal.findById(id).populate('author');
        res.status(200).json(postId)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
app.put('/post',uploadMiddleware.single('file'),async(req,res)=>{
    try {
        let newPath = null
        if(req.file){
            const {originalname,destination,filename,path} = req.file
            const parts = originalname.split('.')
            const ext = parts[parts.length -1];
             newPath = destination +filename+'.'+ext
            fs.renameSync(path,newPath)
        }
        const {token} = req.cookies;
        jwt.verify(token,secret,{},async(err,info)=>{
            if(err) throw err;
            const {id,title,summary,content} = req.body
            let postDoc = await PostModal.findById(id)
            const isAuthor = JSON.stringify(postDoc.author) ===JSON.stringify(info.id)
            if(!isAuthor){
                return res.status(404).json("you are not the author")
            }
              postDoc = await PostModal.findOneAndUpdate({
                title,
                summary,
                content,
                cover:newPath?newPath:postDoc.cover,
            })
            res.json(postDoc);
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// app listen
app.listen(5000,()=>{
    console.log('this api running in port 5000')
})