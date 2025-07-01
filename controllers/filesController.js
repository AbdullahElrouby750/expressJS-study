import File from '../models/files/File.js'

import createFileSchema from "../validators/files/createFileSchema.js"
import updateFileShema from "../validators/files/updateFileShema.js"
import createNewError from '../utils/createNewError.js'

// let files = []

//! get files
export const getFiles = async (req, res, next) => {
    const id = req.params.id
    console.log('id', id)

    try {
        if (id) {
            const targetFile = await File.findById(id);
            console.log('targetFile', targetFile)
            if (!targetFile) return next(createNewError(404, 'file not found!'))
            res.status(200).json(targetFile);
        } else {
            const files = await File.find();
            console.log('files', files)
            res.status(200).json(files);
        }
    } catch (error) {
        return next(error)
    }
}


//! create new file
export const createFile = async (req, res, next) => {
    const body = {
        ...req.body,
        filename: req.file?.filename,
        path: req.file?.path,
    }

    const { error } = createFileSchema.validate(body, { abortEarly: false })
    if (error) return next(createNewError(400, error.details.map(d => d.message).join(', ')))
    const newFile = {
        ...body
    }

    try {
        // files.push(newFile);
        const result = await File.insertOne(newFile)
        console.log('from post file:', result)

        res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}


//! update targeted file
export const updateFile = async (req, res, next) => {
    const id = req.params.id || req.body.id;
    const body = {
        ...req.body,
        filename: req.file?.filename,
        path: req.file?.path,
        id: id,
    }

    const { error } = updateFileShema.validate(body, { abortEarly: false, convert: true })
    if (error) return next(createNewError(400, error.details.map(d => d.message).join(', ')))

    try {
        const targetFile = await File.findOneAndUpdate({ _id: id }, body, { returnDocument: 'after' })
        if (!targetFile)  return next(createNewError(404, 'file not found!'))
        console.log('targetFile from update:: ', targetFile);
        res.status(201).json(targetFile);
    } catch (error) {
        return next(error)
    }
}


//! delete targeted file
//todo: use this delete when the db is ready. as it checks on the file from the db and the file system too
export const deleteFile = async (req, res, next) => {
    const targetFile = req.targetFile
    if(!targetFile) return next(createNewError())
    try {
    res.status(200).json({ message: 'file deleted successfully' })
    } catch (error) {
        return next(error)
    }
}