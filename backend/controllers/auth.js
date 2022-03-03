import User from "../models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import { asyncWrapper } from "../middleware/asyncWrapper.js"
import { createCustomError } from "../utils/customErrors.js"

export const register = asyncWrapper(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.JWT_SEC
      ).toString(),
    })

    const savedUser = await newUser.save()
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: 60 * 60 * 24 * 7 }
    )
    const { ...others } = savedUser._doc
    res.status(200).json({ ...others, accessToken })
  } catch (error) {
    res.status(500).send(error)
  }
})

export const login = asyncWrapper(async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })

    if (!user) {
      return next(createCustomError("Wrong Email", 401))
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SEC
    )

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    const inputPassword = req.body.password

    if (originalPassword != inputPassword) {
      return next(createCustomError("Wrong Password", 401))
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: 60 * 60 * 24 * 7 }
    )

    const { password, ...others } = user._doc
    res.status(200).json({ ...others, accessToken })
  } catch (error) {
    res.status(500).send(error)
  }
})
