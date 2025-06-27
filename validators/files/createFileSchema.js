import Joi from "joi";

const createFileSchema = Joi.object({
    des: Joi.string().min(3).max(100).required(),
    filename: Joi.string().required().messages({'any.required':"'file' is required!"}),
    path: Joi.string().required().messages({'any.required':"'file' is required!"}),

    createdBy: Joi.string().optional(),

    id: Joi.any().forbidden()
}).with('filename','path')

export default createFileSchema;