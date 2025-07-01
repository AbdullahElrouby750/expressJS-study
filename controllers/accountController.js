import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/users/User.js";
import createNewError from '../utils/createNewError.js'
import validateEmail from "../utils/validatEmailOnly.js";
import signupSchema from '../validators/users/signupSchema.js';
import loginSchema from '../validators/users/loginSchema.js'


//! create new user (SIGNUP)
export async function signup(req, res, next) {
    console.log('req.body:: ', req.body)
    const { email } = req.body;
    const emailErr = validateEmail(email);
    if (emailErr) return next(createNewError(400, emailErr.details[0].message));

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(createNewError(400, 'user already exist'));

        const userData = req.body;
        const { error: userDataErr } = signupSchema.validate(userData, { convert: true });
        if (userDataErr) {
            console.log('userDataErr:: ', userDataErr.details)
            return next(createNewError(400, userDataErr.details.map(d => d.message).join(', ')));
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword

        const result = await User.insertOne(userData);
        res.status(201).json(result);
    } catch (error) {
        return next(error)
    }
}


//! LOGIN into existing users
export async function login(req, res, next) {
    const { password, email } = req.body;

    const { error: userDataErr } = loginSchema.validate({ email: email, password: password });
    if (userDataErr) return next(createNewError(400, userDataErr.details.map(d => d.message).join(', ')));

    try {
        const user = await User.findOne({ email });
        if (!user) return next(createNewError(401, 'Invalid credentials'));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(createNewError(401, 'Invalid credentials'));

        const token = jwt.sign(
            { id: user._id, userRole: user.userRole },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        return next(error)
    }
}


