
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js'
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use('/api/user', userRoutes);

export default app