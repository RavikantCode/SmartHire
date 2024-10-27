import cookieParser from 'cookie-parser'
import express from 'express'
import connectDb from './utils/db.js';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import tpoRoute from './routes/tpo.route.js'
import JobRoute from './routes/job.route.js'
import cors from 'cors'
import ApplicationRoute from './routes/application.route.js'

dotenv.config({});
const app=express()
const port= process.env.PORT || 8000;
 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,           
  };
app.use(cors(corsOptions));
app.use("/files",express.static("files"))
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/user',tpoRoute)
app.use('/api/v1/job',JobRoute)
app.use('/api/v1/application',ApplicationRoute)


app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on ${port}`);
    
})