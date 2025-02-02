import express from "express";
import dotenv  from "dotenv";
import {Server} from "socket.io"
import {createServer} from "http"
import bodyParser from "body-parser";
import insAuthRouter from "./routes/InsAuth.js";
import studRouter from "./routes/StudAuth.js";
import cors from "cors";
import prisma from "./prisma/prisma.js";
import insActionRouter from "./routes/insActions.js";
import { createDoubt, Actions } from "./routes/commonActions.js";
import StudActionRouter from "./routes/studActions.js";
import { log } from "console";
dotenv.config();

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend's URL
    methods: ["GET", "POST"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  },
});

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  };

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use('/insAuth', insAuthRouter)
app.use('/studAuth', studRouter)
app.use('/insActions',insActionRouter)
app.use('/common',Actions)
app.use('/studActions', StudActionRouter)


io.on('connection' , (socket) => {

  console.log(`UserConnected: ${socket.id}`);

  socket.on("ins-join-room"  , async ({roomId, userId}) => {

      try{
        socket.join(roomId);

      // fetch previous doubts 
      io.to(roomId).emit("success-join", `${userId} has joined room ${roomId}`)

      }
      catch(e)
      {
        console.log(e);
        
      }
  })

  socket.on("new-message" , async ({message , roomId , username, userId}) => {

    try{
      const newDoubt  = await  createDoubt({message,roomId, username, userId})  
      if(newDoubt !== "Error")
      { 
        console.log(newDoubt);
        
        io.to(roomId).emit("new-message" , newDoubt)
        
      }
      else
      {
        io.to(roomId).emit("error" , "Cannot create new doubt")
      }
    
    
    }
    catch(e)
    {
      console.log(e);
      
      io.to(roomId).emit("error" , "Cannot create new doubt")
    }
   
  })  

  socket.on("voteUpdated" , async(room) => {

    const doubts = await prisma.doubts.findMany({
        where:{ roomId : room},
        orderBy: [
          { voteCount: "desc" },
          { createdAt: "desc" }
        ],
    })

    if(doubts)
    {
      io.to(room).emit("voteUpdated", doubts)
    }
  })

  socket.on("deleteDoubt" , async (data)=> {
      try{
        console.log(data.id, data.room );
        
        const response = await prisma.doubts.delete({
          where: {
            id : data.id
          }
        })
        if(response)
        {
          io.to(data.room).emit("doubtDeleted")
        }


      }
      catch(e)
      {
        console.log(e);
        
      }
  })
  
})


const port = process.env.PORT ;

server.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    
})