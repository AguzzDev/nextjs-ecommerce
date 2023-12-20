import Product from "../models/Product.js";
import { findUser } from "./findUser.js";

export const userCart = async (userId) => {
  const { cart } = await findUser(userId);

  if (cart.products.length > 0) {
    const products = await Promise.all(
      cart.products.map(
        async ({ id, _id: cartId, quantity, price, size, color }) => {
          const product = await Product.findById(id);

          return {
            ...product.toObject(),
            cartId,
            quantity,
            price,
            size,
            color,
          };
        }
      )
    );

    return { products, total: cart.total };
  }

  return cart;
};
