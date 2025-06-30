import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.email().required(),
    password: Joi.string().required(),

    userName:  Joi.string().required(),
    userRole:  Joi.string().required(),
    phone:  Joi.string().required(),
    joinDate: Joi.date().required(),

    age: Joi.number().optional(),

    id: Joi.forbidden(),
});

export default signupSchema;