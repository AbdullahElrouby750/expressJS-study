import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(RegExp('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$')).required(),
})

export default loginSchema;