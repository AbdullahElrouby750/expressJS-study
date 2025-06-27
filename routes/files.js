import express from  'express'
import { createFile, deleteFile, getFiles, updateFile } from '../controllers/filesController.js';
import uploadFilMiddleware from '../middleware/file/uploadFileMiddleware.js';
import deleteFileMiddleware from '../middleware/file/deleteFileMiddleware.js';


const router = express.Router();

router.get('/{:id}', getFiles);

router.post('/', uploadFilMiddleware ,createFile);

router.put('/{:id}', uploadFilMiddleware ,updateFile);

router.delete('/:id',deleteFile);

// router.delete('/:id', deleteFileMiddleware, deleteFile);

export default router