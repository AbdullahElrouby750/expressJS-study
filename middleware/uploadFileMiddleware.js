import multer from "multer";
import {v4 as uuidv4} from 'uuid'

import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const uploadDir = path.join(rootDir , 'uploads');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, uploadDir)
    },
    filename:(req, file, cb) =>{
        const uniqeName = uuidv4() + path.join(file.originalname);
        cb(null, uniqeName);
    }
})

const uploadFilMiddleware = multer({storage:storage}).single('file')


export default uploadFilMiddleware