import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
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
  const values = req.body;

  try {
    if (values.password.length < 8) {
      return res
        .status(400)
        .json("La contraseña debe tener 8 caracteres o mas");
    }

    const newUser = new User({
      name: values.name,
      surname: values.surname,
      email: values.email,
      location: {
        address: values.address,
        address_number: values.address_number,
        city: values.city,
        country: values.country,
        province: values.province,
        postal_code: values.postal_code,
      },
      password: CryptoJS.AES.encrypt(
        values.password,
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

    const {
      createdAt,
      updatedAt,
      _id,
      isAdmin,
      password,
      ...others
    } = savedUser._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("El email ya fue usado");
    }
    res.status(500).send(error);
  }
});

export const login = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).send("El email no existe");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.JWT_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).send("La contraseña es incorrecta");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "30d" }
    );

    const {
      createdAt,
      updatedAt,
      _id,
      isAdmin,
      password,
      ...others
    } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
});
