import User from "../models/User.js";

export const findUser = async (user) => await User.findById(user);
