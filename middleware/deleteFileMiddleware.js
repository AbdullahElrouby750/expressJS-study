import { unlink } from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(unlink)

const files = []

export default async function deleteFileMiddleware(req, res, next) {
    const id = req.params.id;
    try {
        if (id && isNaN(+id)) {
            const err = new Error("Invalid id!");
            err.status = 400
            return next(err);
        }

        const targeFile = files.find(file => +file.id === +id || null)
        if (!targeFile) {
            const err = new Error(`file not found!`)
            err.status = 404
            return next(err)
        }
        
        await unlinkAsync(targeFile.path)
        req.targeFile = targeFile
        next()
    } catch (error) {
        next(error)
    }

}