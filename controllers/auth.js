import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'
import { PasswordsNotMatching, Unauthorized } from '../lib/errors.js'
import jwt from "jsonwebtoken"
import { secret } from '../config/environment.js'
const router = express.Router()

// lets use the errors from errors.js

router.post('/signup', async (req, res, next) => {
  try {

    if (req.body.password !== req.body.passwordConfirmation) {
      throw new PasswordsNotMatching()
    }

    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = passwordHash

    const user = await User.create(req.body)
    res.status(201).json({
        message: `Welcome ${user.username}!`,
    })

  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Unauthorized()
    }
    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!passwordsMatch) {
      throw new Unauthorized()
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id,
      },
      secret,
      {
        expiresIn: '7d',
      }

    )

    res.send({
      message: 'Welcome Back',
      token,
    })

  } catch (err) {
    next(err)
  }
})

export default router

