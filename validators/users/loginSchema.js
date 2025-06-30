import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.email().required(),
    password: Joi.email().required(),
})

export default loginSchema;