import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().pattern(RegExp('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$')).optional(),
    userName: Joi.string().optional(),
    userRole: Joi.string().optional(),
    phone: Joi.string().optional(),
    joinDate: Joi.date().optional(),
    age: Joi.number().optional(),

    id: Joi.required(),
});

export default signupSchema;