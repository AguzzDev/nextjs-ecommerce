import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (values, user) => {
  const user = await User.findById(req.user.id);

  const newOrder = new Order({
    userId: user.id,
    products: values.products.map((item) => ({
      ...item,
      productId: item.productId,
      img: item.img[0],
    })),
    userInfo: user,
    createdAt: Date.now(),
    sending: values.sending,
    total: values.total,
  });

  const orderSaved = await newOrder.save();
 
};
