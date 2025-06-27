import Joi from "joi";

const updateFileShema = Joi.object({
    id: Joi.number().positive().integer().required(),
    des: Joi.string().min(3).max(100).required(),
    filename: Joi.string().optional(),
    path: Joi.string().optional(),

    createdBy: Joi.string().optional(),
}).with('filename','path')

export default updateFileShema;