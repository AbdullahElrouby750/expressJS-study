
let files = []

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

export const createFile = (req, res, next) => {
    const body = req.body
    if (!req.file) {
        const err = new Error("file is required!");
        err.status = 400
        return next(err)
    }
    if (!body || Object.keys(body).length === 0) {
        const err = new Error(`the data of the files are needed`)
        err.status = 400
        return next(err)
    }

    const newFile = {
        id: files.length + 1,
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        des: body.des
    }

    try {
        files.push(newFile);
        console.log('from post file, files:', files)
        
        res.status(201).json(newFile)
    } catch (error) {
        return next(error)
    }
}

export const updateFile = (req, res, next) => {
    const body = req.body
    if (!body || Object.keys(body).length === 0) {
        const err = new Error(`the data of the files are needed`)
        err.status = 400
        return next(err)
    }

    const id = req.params.id || body.id;
    if (!id || isNaN(+id)) {
        const err = new Error(`file's id is required`)
        err.status = 400
        return next(err)
    }

    const targetFile = files.find(file => +file.id === +id || null)
    if (!targetFile) {
        const err = new Error(`file not found!`)
        err.status = 404
        return next(err)
    }
    console.log('targetFile', targetFile);
    const newElement = {
        id: id,
        filename: req.file ? req.file.filename : targetFile.filename,
        path: req.file ? `/uploads/${req.file.filename}` : targetFile.path,
        des: body.des,
    }

    try {
        files = files.filter(file => +file.id === +id ? newElement : file)
        res.status(201).json(newElement);
        console.log('files', files)
    } catch (error) {
        return next(error)
    }
}

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