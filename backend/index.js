import express from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import insAuthRouter from "./routes/InsAuth.js";
import studRouter from "./routes/StudAuth.js";



dotenv.config();

const app = express()

app.use(bodyParser.json());

app.use('/insAuth', insAuthRouter)
app.use('/studAuth', studRouter)


const port = process.env.PORT ;

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    
})