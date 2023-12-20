import { asyncWrapper } from "../middleware/asyncWrapper.js";
import Order from "../models/Order.js";

export const updateOrder = asyncWrapper(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedOrder);
});

export const deleteOrder = asyncWrapper(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json("Orden eliminada");
});

export const getUserOrder = asyncWrapper(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "products"
    );

    res.status(200).json(orders);
  } catch (error) {
    res.send(500);
  }
});

export const getAllOrder = asyncWrapper(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json(orders);
});
