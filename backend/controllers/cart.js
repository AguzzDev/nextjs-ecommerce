import { asyncWrapper } from "../middleware/asyncWrapper.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { findUser } from "../utils/findUser.js";
import { userCart } from "../utils/userCart.js";

export const getAllCart = asyncWrapper(async (req, res) => {
  const data = await User.find();

  res.status(200).json(data);
});

export const getCart = asyncWrapper(async (req, res) => {
  const cart = await userCart(req.user.id);

  res.status(200).json(cart);
});

export const createCart = asyncWrapper(async (req, res) => {
  const body = req.body.product;

  try {
    const product = await Product.findById(req.body.id);

    if (product.quantity < body.quantity) {
      return res.status(400).json("Sin Stock");
    }

    const priceTotal = product.price * body.quantity;

    await Product.findByIdAndUpdate(
      req.body.id,
      {
        $inc: { quantity: -body.quantity },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          "cart.products": {
            id: req.body.id,
            quantity: body.quantity,
            price: priceTotal,
            size: [body.size],
            color: [body.color],
          },
        },
        $inc: {
          "cart.total": priceTotal,
        },
      },
      { new: true }
    );

    const resp = await userCart(req.user.id);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500);
  }
});

export const deleteItemCart = asyncWrapper(async (req, res) => {
  const { cart } = await findUser(req.user.id);

  const cartFilter = cart.products.filter((p) => p._id == req.body.id)[0];

  if (!cartFilter) {
    return res.status(400).send("Producto ya eliminado");
  }

  await Product.findByIdAndUpdate(
    cartFilter.id,
    {
      $inc: {
        quantity: cartFilter.quantity,
      },
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: {
        "cart.products": { _id: req.body.id },
      },
      $inc: {
        "cart.total": -cartFilter.price,
      },
    },
    { new: true }
  );

  res.status(200).json(cartFilter);
});

export const deleteCart = asyncWrapper(async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.user.id },
    { cart: { products: [], total: 0 } },
    { new: true }
  );

  res.status(200).json(data);
});
