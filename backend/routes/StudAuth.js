import express from "express";
import prisma from "../prisma/prisma.js";
import { hashPassword, hashRefreshToken, generateAccessToken, generateRefreshToken, StoreStudRefreshToken, verifyStudRefreshToken } from "../authHelpers.js";
import bcrypt from 'bcryptjs'



const studRouter  = express.Router();


studRouter.post('/signup', async (req, res) => {

    const {email, password, username} = req.body;


    try{
        const existingUser  = await prisma.user_Student.findUnique({
            where  : {email}
        })
        if(existingUser)
        {
            return res.status(400).json({message: 'Email already in use'})
        }

        const HashPassword = await hashPassword(password);

        const user = await prisma.user_Student.create({
            data : {
                email,
                username,
                password: HashPassword

            }
        })
        const refreshToken = generateRefreshToken(user.id);
        const accesstoken = generateAccessToken(user.id);
      
        await StoreStudRefreshToken(user.id , refreshToken);
        return res.json({ accesstoken, refreshToken,role:'stud' })


    }
    catch(error )
    {
        console.log(error);
        
        res.status(500).json({
            error : 'Error Signing Up'
        });
    }

})


studRouter.post('/login' , async (req, res) => {
    const {email, password} = req.body;
   
   try { 
        const existUser = await prisma.user_Student.findUnique({
        where : {email}
        })

        if(!existUser) 
        {
            return res.status(400).json({message : "Invalid Credentials "})
        }

        const isValid = await bcrypt.compare(password, existUser.password)
        if(!isValid) 
        {
            return res.status(400).json({message :'Invalid Password'})
        }

        const refreshToken = generateRefreshToken(existUser.id);
        const accessToken  =  generateAccessToken(existUser.id);
       

        await StoreStudRefreshToken(existUser.id, refreshToken)
        return  res.json({accessToken,refreshToken, role:'stud' })
        
    }
    catch(error)
    {
        console.log(error);
        
        return res.status(500).json({message: 'Error Signing Up '})
    }

    
})

studRouter.post('/refreshtoken', async(req, res) => {

  
    const {email, refreshToken } = req.body;

    if(!refreshToken)
    {
        return res.status(400).json({message : "Refresh Token is Required"})
    }

    try {

        const existingUser  = await prisma.user_Student.findUnique({
            where  : {email}
        })

        if(!existingUser)
        {
            return res.status(403).json({ message: "Invalid user" });
        }

        const  id = await verifyStudRefreshToken(existingUser.id, refreshToken)
        console.log(id , "result of token comparison ");
        
        if(!id) 
        {
            return res.status(400).json({message:'Invalid refresh token '})
        }
        const new_accessToken  = generateAccessToken(existingUser.id);
        const new_refreshToken = generateRefreshToken(existingUser.id);


        await prisma.refreshToken_User.delete({
            where : {id : id}
        })

        await StoreStudRefreshToken(existingUser.id, new_refreshToken);
        return res.json({
            accessToken: new_accessToken,
            refreshToken: new_refreshToken,
            
          });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message: "Error refreshing tokens"})
        
    }



})
export default studRouter;