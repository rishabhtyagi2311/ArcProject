import express from "express";
import dotenv  from "dotenv";
import {Server} from "socket.io"
import {createServer} from "http"
import bodyParser from "body-parser";
import insAuthRouter from "./routes/InsAuth.js";
import studRouter from "./routes/StudAuth.js";
import cors from "cors";
import insActionRouter from "./routes/insActions.js";
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

  socket.on("new-message" , ({message , roomId}) => {

    console.log(message);
    
    io.to(roomId).emit("new-message" , {message})
  })  


  
})


const port = process.env.PORT ;

server.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    
})