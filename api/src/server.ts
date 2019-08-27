import express from 'express';
import {connect, connection} from 'mongoose';
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
connect(db, {useNewUrlParser: true, useCreateIndex: true});

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

// Process an uncaught exception
process.on("uncaughtException", (error: any) => {
    console.error(`uncaughtException: ${error}`);
    connection.close();
    process.exit();
});

// Process an unhandled rejection
process.on("unhandledRejection", (error: any) => {
    console.error(`unhandledRejection: ${error}`);
    connection.close();
    process.exit();
});

// Process singal interrupt
process.on("SIGINT", () => {
    console.log("Received SIGINT. Stoping process.");
    connection.close();
    process.exit();
});