import  jwt from "jsonwebtoken";

import dotenv from "dotenv";
import prisma from "./prisma/prisma.js";
import bcrypt from 'bcryptjs';




dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;


export const generateAccessToken = (userId) => {

    return jwt.sign({userId}, ACCESS_TOKEN_SECRET , {expiresIn : ACCESS_TOKEN_EXPIRATION});
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  };

export const hashRefreshToken = async (refreshToken) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(refreshToken, salt);
};


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

export const verifyInsRefreshToken =  async (userId, refreshToken ) => {

  const userTokens = await prisma.refreshToken_Instructor.findMany({
    where: { userId },
  });
  if(!userTokens) return false;

  
  const matchedToken = userTokens.find(tokenEntry =>
    bcrypt.compareSync(refreshToken, tokenEntry.hashedToken)
    );

  if (!matchedToken) {
    return false;
  }



  if (new Date() > new Date(matchedToken.expiresAt)) {

      return false;
  }



  return matchedToken.id  ;
}


export const StoreInsRefreshToken = async (userId, refreshToken) => {

  const hashedToken = await hashRefreshToken(refreshToken);
  console.log(hashedToken);
  
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 7);

 await prisma.refreshToken_Instructor.create({
  data:{
      userId: userId,
      hashedToken : hashedToken,
      expiresAt: expirationTime 

  }
 })

}

export const verifyStudRefreshToken = async (userId, refreshToken) => 
  {
    const userTokens = await prisma.refreshToken_User.findMany({
      where: { userId },
    });
    if(!userTokens) return false;
    const matchedToken = userTokens.find(tokenEntry =>
      bcrypt.compareSync(refreshToken, tokenEntry.hashedToken)
      );

    if (!matchedToken) {
      return false;
    }

    if (new Date() > new Date(matchedToken.expiresAt)) {
      
      return false;
    }
  return matchedToken.id  ;
}
export const StoreStudRefreshToken = async (userId, refreshToken) => {
  const hashedToken = await hashRefreshToken(refreshToken);
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 7);
  await prisma.refreshToken_User.create({
    data:{
        userId,
        hashedToken,
        expiresAt: expirationTime 
  
    }
   })
}