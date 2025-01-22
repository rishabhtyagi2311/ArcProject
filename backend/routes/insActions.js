import express from "express"
import prisma from "../prisma/prisma.js"

const insActionRouter = express.Router()

insActionRouter.post('/createRoom', async (req, res) => {
    const { name, code, userId } = req.body;
  
    try {
      const existingRoom = await prisma.courseRoom.findFirst({
        where: {
          code: code,
        },
      });
  
      if (existingRoom) {
        return res.status(403).json({ message: "Room Already Exists" });
      }
  
      const createdRoom = await prisma.courseRoom.create({
        data: {
          name: name,
          code: code,
          members: 0, 
          creatorId : userId
        },
      });
  
      return res.status(200).json({ createdRoom });
    } 
    catch (error) 
    {
      console.error(error);
      return res.status(500).json({ message: "An error occurred", error });
    }
});


insActionRouter.get('/rooms' , async (req, res) =>{

  const {userId}  = req.body

  try{
    const rooms = await prisma.courseRoom.findMany({
      where  : 
        {
          creatorId:userId }
    })
    if(rooms)
    {
      return res.json(rooms)
    }
    return  res.status(404).json({ message: 'No rooms found for this user' });


  }
  catch(error)
  {
    return res.status(500).json({message: "Error fetching rooms "})
  }

})
  

export default insActionRouter