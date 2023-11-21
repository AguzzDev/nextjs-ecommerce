import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { createCustomError } from "../utils/customErrors.js";
import { sendMail } from "../utils/sendEmail.js";

export const forgetPassword = asyncWrapper(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("No hay cuenta con este correo");
    }

    const token = await jwt.sign(
      { _id: user._id },
      process.env.CHANGE_PASSWORD_SEC,
      { expiresIn: "20min" }
    );

    await User.findByIdAndUpdate(
      user,
      { $set: { changePassword: token } },
      { new: true }
    );

    await sendMail(email, token);

    res.status(200).json("Correo enviado");
  } catch (error) {
    res.status(500).json(error);
  }
});

export const changePassword = asyncWrapper(async (req, res) => {
  try {
    const { param, values } = req.body;

    jwt.verify(param, process.env.CHANGE_PASSWORD_SEC, async (err) => {
      if (err) return res.status(401).json("Expiro el token");
    });

    await User.findOneAndUpdate(
      { changePassword: param },
      {
        $set: {
          password: CryptoJS.AES.encrypt(
            values.password,
            process.env.JWT_SEC
          ).toString(),
        },
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

export const register = asyncWrapper(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      province: req.body.province,
      postal_code: req.body.postal_code,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.JWT_SEC
      ).toString(),
    });

    const savedUser = await newUser.save();

    const accessToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    );
    const { ...others } = savedUser._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
});

export const login = asyncWrapper(async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(createCustomError("El email no existe", 401));
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return next(createCustomError("La contraseña es incorrecta", 401));
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    );

    const { ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
});
