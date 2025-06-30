import Joi from "joi";

const updateFileShema = Joi.object({
    id: Joi.string().required(),
    des: Joi.string().min(3).max(100).optional(),
    filename: Joi.string().optional(),
    path: Joi.string().optional(),

    category: Joi.string().min(3).max(20).optional(),
    createdBy: Joi.string().optional(),
}).with('filename','path')

export default updateFileShema;