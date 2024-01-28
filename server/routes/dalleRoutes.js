import express  from "express";
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

router.post('/', async(req, res, next) => {
    
    try {
        const { prompt } = req.body;
        console.log(prompt);
        const response  = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1, 
            size: "1024x1024",
        });
        
        const image_url = response.data[0].url;
        
        return res.status(200).json({
            img: image_url 
        });
    }catch (error) {
        res.status(500).send(error.message);
    }
    
    
});

export default router;