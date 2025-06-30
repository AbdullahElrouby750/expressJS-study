import File from '../../models/files/File.js'

import { unlink } from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(unlink)

const files = []

export default async function deleteFileMiddleware(req, res, next) {
    const id = req.params.id;
    try {

        if(id){
            const targeFile = await File.findOneAndDelete({_id:id})
            console.log('targeFile', targeFile)
            if (!targeFile) {
                const err = new Error(`file not found!`)
                err.status = 404
                return next(err)
            }
            console.log('targeFile.path:: ', targeFile.path)
            console.log('targeFile.path type:: ',typeof targeFile.path)
            await unlinkAsync(targeFile.path)
            req.targeFile = targeFile
            next()
        }
    } catch (error) {
        next(error)
    }

}