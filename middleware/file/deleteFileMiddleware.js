import File from '../../models/files/File.js'
import createNewError from '../../utils/createNewError.js'

import { unlink } from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(unlink)

export default async function deleteFileMiddleware(req, res, next) {
    const id = req.params.id;
    try {

        if(id){
            const targeFile = await File.findOneAndDelete({_id:id})
            if (!targeFile) return next(createNewError(404, 'file not found!'))
            await unlinkAsync(targeFile.path)
            req.targeFile = targeFile
            next()
        }
    } catch (error) {
        next(error)
    }

}