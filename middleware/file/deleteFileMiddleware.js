import File from '../../models/files/File.js'
import createNewError from '../../utils/createNewError.js'

import { unlink } from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(unlink)

export default async function deleteFileMiddleware(req, res, next) {
    const id = req.params.id;
    try {

        if(id){
            const targetFile = await File.findOneAndDelete({_id:id});
            console.log('targetFile::', targetFile);
            if (!targetFile) return next(createNewError(404, 'file not found!'))
            await unlinkAsync(targetFile.path)
            req.targetFile = targetFile
            next()
        }
    } catch (error) {
        next(error)
    }

}