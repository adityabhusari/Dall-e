import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
   
app.use(cors(
    { 
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
));


app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res, next) => {
    res.json({
        msg: "JI"
    })
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

export default app;   