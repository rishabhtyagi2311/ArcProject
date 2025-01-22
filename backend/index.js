import express from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import insAuthRouter from "./routes/InsAuth.js";
import studRouter from "./routes/StudAuth.js";
import cors from "cors";
import insActionRouter from "./routes/insActions.js";

dotenv.config();

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  };

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use('/insAuth', insAuthRouter)
app.use('/studAuth', studRouter)
app.use('/insActions',insActionRouter)


const port = process.env.PORT ;

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    
})