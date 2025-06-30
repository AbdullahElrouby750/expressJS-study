import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.email().optional(),
    password: Joi.string().optional(),
    userName: Joi.string().optional(),
    userRole: Joi.string().optional(),
    phone: Joi.string().optional(),
    joinDate: Joi.date().optional(),
    age: Joi.number().optional(),

    id: Joi.required(),
});

export default signupSchema;