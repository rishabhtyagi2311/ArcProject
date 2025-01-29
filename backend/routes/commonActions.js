
import prisma from "../prisma/prisma.js";
import { Router } from "express";


export const createDoubt = async ({message, username, roomId, userId}) => {

    const doubt = await prisma.doubts.create( {
       data: {
        message,
        username,
    
        roomId,
        userId

       }

    })
    console.log(doubt);
    
    if(doubt) return doubt
    return "Error"
}


export const Actions  = Router()


Actions.get("/doubts/:roomId", async (req, res) => {
    const { roomId } = req.params;
    console.log(roomId);
    
   
    
  
    try {
      const messages = await prisma.doubts.findMany({
        where: { roomId },
        orderBy: [
          { voteCount: "desc" },
          { createdAt: "desc" }
        ],
      });
      console.log(messages);
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching messages" });
    }
  });
