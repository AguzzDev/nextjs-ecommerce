import User from "../models/User.js";

export const findUserByEmail = async (email) => await User.findOne({ email });
