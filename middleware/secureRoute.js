import { Unauthorized } from "../lib/errors.js"
import jwt from "jsonwebtoken"
import { secret } from "../config/environment.js"
import User from "../models/user.js"
import mongoose from 'mongoose'

async function secureRoute  (req, res, next) {
    try {

        const rawToken = req.headers.authorization

        if (!rawToken) throw new Unauthorized()

        const token = rawToken.replace('Bearer ', '')
        
        const payload = jwt.verify(token, secret)

        const user = await User.findById(payload.userId)

        if (!user) throw new Unauthorized()

        res.locals.currentUser = user

        next()
    } catch (err) {
        next(err)
    }
}

export default secureRoute;