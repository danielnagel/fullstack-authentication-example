import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {
    json
} from 'body-parser';
import morgan from 'morgan';
import {
    port,
    db
} from './config';
import router from './router';

const app = express();
mongoose.connect(db, {useNewUrlParser: true});

app.use(morgan('combined'));
app.use(cors());
app.enable('trust proxy');
app.use(json({
    type: '*/*'
}));

router(app);

app.listen(port, () => {
    console.log(`Server started on port  + ${port}`);
});