import express from 'express'
import path from 'path'

//middleware
import loggerMiddleware from './middleware/loggerMiddleware.js';
import notFound from './middleware/error/notFoundMiddleware.js';
import errorMiddleware from './middleware/error/errorMiddleware.js';

//routes
import files from './routes/files.js'


const port = process.env.PORT || 3000

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(import.meta.dirname,'public')))

//logger middleware
app.use(loggerMiddleware)

//routes
app.use('/api/files', files)


//error handler
app.use(notFound)
app.use(errorMiddleware)



app.listen(port, () => console.log(`app is running on http://localhost:3000/`))