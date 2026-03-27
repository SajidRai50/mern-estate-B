import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import  userRouter from './routes/user.route.js'
 const app =express();
 console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ Error:", err);
  });
 app.listen(3000,()=>{
    console.log('server is running at port 3000!!!!!!!!!!!')
 });

 app.use('/api/user',userRouter)