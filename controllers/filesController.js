import createFileSchema from "../validators/files/createFileSchema.js"
import updateFileShema from "../validators/files/updateFileShema.js"

let files = []

//! get files
export const getFiles = (req, res, next) => {
    console.log('from get files: ', files)
    const id = req.params.id
    console.log('id', id)
    let targetFile = null;
    if (id && isNaN(+id)) {
        const err = new Error("Invalid id!");
        err.status = 400
        return next(err);
    }

    try {
        if (id) {
            targetFile = files.find(file => +file.id === +id || null)
            if (!targetFile) {
                const err = new Error(`file not found!`)
                err.status = 404
                return next(err)
            }
        }
        res.status(200).json(id ? targetFile : files);
    } catch (error) {
        return next(error)
    }
}


//! create new file
export const createFile = (req, res, next) => {
    const body = {
        ...req.body,
        filename: req.file?.filename,
        path: req.file?.path,
    }

    const { error } = createFileSchema.validate(body, { abortEarly: false })
    if (error) {
        console.log('error :: ', error)
        const err = new Error(error.details.map(d => d.message).join(', '))
        err.status = 400;
        console.log('err :: ', err)
        return next(err)
    }

    const newFile = {
        id: files.length + 1,
        ...body
        // filename: req.file.filename,
        // path: `/uploads/${req.file.filename}`,
        // des: body.des,
        // createdBy: body.createdBy
    }

    try {
        files.push(newFile);
        console.log('from post file, files:', files)

        res.status(201).json(newFile)
    } catch (error) {
        return next(error)
    }
}


//! update targeted file
export const updateFile = (req, res, next) => {
    const id = +req.params.id || +req.body.id;
    const body = {
        ...req.body,
        filename: req.file?.filename,
        path: req.file?.path,
        id: isNaN(id) ? undefined : id,
    }

    const { error } = updateFileShema.validate(body, { abortEarly: false , convert: true})
    if (error) {
        console.log('error :: ', error)
        const err = new Error(error.details.map(d => d.message).join(', '))
        err.status = 400;
        console.log('err :: ', err)
        return next(err)
    }


    const targetFile = files.find(file => +file.id === id || null)
    if (!targetFile) {
        const err = new Error(`file not found!`)
        err.status = 404
        return next(err)
    }

    //file not uploaded(user do not want to change the existed file)
    if (!body.filename) {
        body['filename'] = targetFile.filename
        body['path'] = targetFile.path
    }

    console.log('targetFile', targetFile);
    const newElement = {
        ...targetFile,
        ...body,
    }

    try {
        files = files.filter(file => +file.id === id ? newElement : file)
        res.status(201).json(newElement);
        console.log('files', files)
    } catch (error) {
        return next(error)
    }
}


//! delete targeted file
export const deleteFile = (req, res, next) => {
    const id = req.params.id;
    console.log('id', id)
    if (!id || isNaN(+id)) {
        const err = new Error(`file's id is required`)
        err.status = 400
        return next(err)
    }

    try {
        const targetFile = files.find(file => +file.id === +id || null)
        if (!targetFile) {
            const err = new Error(`file not found!`)
            err.status = 404
            return next(err)
        }
        files = files.filter(file => +file.id !== +id)
        res.status(200).json({ message: 'file deleted successfully' })
    } catch (error) {
        return next(error)
    }
}



//todo: use this delete when the db is ready. as it checks on the file from the db and the file system too
// export const deleteFile = (req, res, next) => {
//     const targetFile = req.targetFile
//     if(!targetFile){
//         const err = new Error(`Internal server error!`)
//         err.status = 500
//         return next(err)
//     }
//     try {
//     // await req.fileDoc.deleteOne();
//     res.status(200).json({ message: 'file deleted successfully' })
//     } catch (error) {
//         return next(error)
//     }
// }