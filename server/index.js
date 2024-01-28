import { createServer } from 'http';
import app from './app.js'
import { serialize } from 'v8';
import connectDB from './mongodb/connect.js';
import * as dotenv from 'dotenv';

const port = process.env.PORT || 8080

dotenv.config();

const server = async() => {
    
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log("Listening to server 8080");
        })
    }catch (error) {
        console.log(error);
    }
}

server();