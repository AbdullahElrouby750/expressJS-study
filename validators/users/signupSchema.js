import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(RegExp('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$')).required(),

    userName:  Joi.string().required(),
    userRole:  Joi.string().required(),
    phone:  Joi.string().required(),
    joinDate: Joi.date().optional(),

    age: Joi.number().optional(),

    id: Joi.forbidden(),
});

export default signupSchema;