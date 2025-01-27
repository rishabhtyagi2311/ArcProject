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


insActionRouter.get('/rooms', async (req, res) => {
  const userId = parseInt(req.query.param1, 10);
  
  console.log("Received userId:", userId);
  
  if (!userId) {
    return res.status(400).json({ message: "User ID is not found" });
  }

  try {
    const rooms = await prisma.courseRoom.findMany({
      where: {
        creatorId: userId,
      },
    });

    console.log("Fetched Rooms:", rooms);

    if (rooms.length === 0) {
      return res.status(200).json({ message: "No rooms found for this user" });
    }

    return res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Error fetching rooms" });
  }
});


export default insActionRouter