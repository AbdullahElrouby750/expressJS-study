import Joi from "joi";

const emailSchema = Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
})

const validateEmail = (email) => {
    const { error } = emailSchema.validate(email)
    return (error);
}

export default validateEmail;