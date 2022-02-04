import express from 'express';
import {logger} from './middleware/test';
import config from 'config';
import {userRoutes} from './routes/users';
import {authRoutes} from './routes/auth';
import mongoose from 'mongoose';

mongoose.connect(config.get("connectionString")).then(() => console.log("Connected to Mongo db"))

const app = express();

console.log("Connection String: " + config.get("connectionString"));
console.log("Application: " + config.get('name'));

//Middleware to parse json
app.use(express.json());
app.use(logger);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Salam alaykum');
});
