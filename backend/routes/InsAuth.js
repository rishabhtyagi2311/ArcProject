import express from "express";
import bcrypt from 'bcryptjs';
import prisma from "../prisma/prisma.js";
import { generateAccessToken, generateRefreshToken, hashPassword, StoreInsRefreshToken, verifyInsRefreshToken } from "../authHelpers.js";


const insAuthRouter = express.Router();


insAuthRouter.post('/signup',   async (req, res) => {
    console.log(req.body,  "inserting ");
    

    const {email, password, username} = req.body;

    try {
        const existingUser  = await prisma.user_Instructor.findUnique({
            where : {email}
        });

        if(existingUser){
            return res.status(400).json ({
                error: 'Email already in use' 
            });

        }
        
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user_Instructor.create({
            data:{
                email , 
                username,
                password: hashedPassword
            }
        })
        if(user)
        {
            const accessToken = generateAccessToken(user.id);
            const refreshToken =generateRefreshToken(user.id);
           
            await StoreInsRefreshToken(user.id, refreshToken);
            return res.json({accessToken,  refreshToken , role:'Ins', id : user.id});
        }
        else{
            return res.status(400).json({message: "Issue creating new User"})
        }
       
    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).json({
            error : 'Error Signing Up'
        });
    
    }

})

insAuthRouter.post('/login',  async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await prisma.user_Instructor.findUnique({
            where : {email}
        })

        if(!user) return res.status(400).json({
            error: "Invalid Credentials"
        });

        const isValid  = bcrypt.compare(password, user.password)
        if(!isValid)
        {
            return res.status(400).json({error :'Invalid Credentials '})
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);


        await StoreInsRefreshToken(user.id, refreshToken);

        res.json({accessToken, refreshToken, role : 'Ins'});

    }
    catch(error)
    {
        res.status(500).json({
            error : 'Error logging In'
        })
    }
})

insAuthRouter.post('/refreshtoken', async (req, res) => {

    
    
    const {email, refreshToken } = req.body;

    if(!refreshToken)
    {
        return res.status(400).json({message : "Refresh Token is Required"})
    }

    try {

        const existingUser  = await prisma.user_Instructor.findUnique({
            where  : {email}
        })

        
    

        if(!existingUser)
        {
            return res.status(403).json({ message: "Invalid user" });
        }

        const  id = await verifyInsRefreshToken(existingUser.id, refreshToken)

        
        if(!id) 
        {
            return res.status(400).json({message:'Invalid refresh token '})
        }
        const new_accessToken  = generateAccessToken(existingUser.id);
        const new_refreshToken = generateRefreshToken(existingUser.id);


        await prisma.refreshToken_Instructor.delete({
            where : {id : id}
        })

        await StoreInsRefreshToken(existingUser.id, new_refreshToken);
        res.json({
            accessToken: new_accessToken,
            refreshToken: new_refreshToken,
            
          });
               
    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).json({ message: "Internal server error" });
    }

})


export default insAuthRouter;