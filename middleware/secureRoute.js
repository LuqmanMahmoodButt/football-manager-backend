import { Unauthorized } from "../lib/errors.js"
import jwt from "jsonwebtoken"
import { secret } from "../config/environment.js"
import User from "../models/user.js"

async function secureRoute  (req, res, next) {
    try {

        const rawToken = req.headers.authorization
        console.log('10')
        console.log(rawToken)
        if (!rawToken) throw new Unauthorized()

        const token = rawToken.replace('Bearer ', '')
        console.log('14')
        const payload = jwt.verify(token, secret)
        console.log('16')

        const user = await User.findById(payload.userId)
        console.log('19')
        if (!user) throw new Unauthorized()
        console.log('21')
        res.locals.currentUser = user 
        next()
    } catch (err) {
        next(err)
    }
}

export default secureRoute;