import { asyncWrapper } from "../middleware/asyncWrapper.js";
import User from "../models/User.js";

export const getUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id);

  const { password, ...others } = user._doc;
  res.status(200).json(others);
});

export const getAllUser = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

export const updateUser = asyncWrapper(async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

export const deleteUser = asyncWrapper(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("Usuario eliminado");
});
