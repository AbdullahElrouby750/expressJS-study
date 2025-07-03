import express from 'express'
import cookieParser from 'cookie-parser';
import path from 'path'

//middleware
import loggerMiddleware from './middleware/loggerMiddleware.js';
import notFound from './middleware/error/notFoundMiddleware.js';
import errorMiddleware from './middleware/error/errorMiddleware.js';

//routes
import files from './routes/files.js'
import account from './routes/account.js'

//mongoDB
import connectDB from './db.js';


const port = process.env.PORT || 3000

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(import.meta.dirname,'public')))

app.use(cookieParser());

//logger middleware
app.use(loggerMiddleware)

//routes
//!files
app.use('/api/files', files);

//!account
app.use('/api/account', account);


//error handler
app.use(notFound)
app.use(errorMiddleware)

connectDB();

app.listen(port, () => console.log(`app is running on http://localhost:3000/`))