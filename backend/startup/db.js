import mongoose from 'mongoose';
import logger from './winston.js';

export  default function(){
    mongoose.connect(process.env.MONGO_URI,).then(()=>logger.info("Connected to DB") );
}