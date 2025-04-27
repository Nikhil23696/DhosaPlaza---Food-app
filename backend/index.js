import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import cloudinary from 'cloudinary' 
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import menuRoute from './routes/menuRoute.js';
import orderRoute from './routes/orderRoute.js';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../config.env') });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
  
connectDB();
const PORT = process.env.PORT;
const app = express();   

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
   
}));
 
//api  
 app.use('/api/v1/user', userRoute);
 app.use('/api/v1/menu', menuRoute);  
 app.use('/api/v1/order', orderRoute);  

 app.use(express.static(path.join(__dirname, "../frontend/dist")));
 app.get('*', (_,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
 })

app.listen(PORT, () => {
    console.log(`{Server is listening on PORT: ${PORT}}`) 
});    