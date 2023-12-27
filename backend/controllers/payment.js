import mercadopago from "mercadopago";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { userCart } from "../utils/userCart.js";
import { findUser } from "../utils/findUser.js";
import { findUserByEmail } from "../utils/findUserByEmail.js";

export const getPaymentOrder = asyncWrapper(async (req, res) => {
  try {
    const find = await Payment.findOne({ userId: req.user.id });

    res.status(200).json(find.orderId);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const createPayment = asyncWrapper(async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_TOKEN,
  });

  const user = await findUser(req.user.id);

  let preference = {
    payer: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      address: {
        street_name: user.location.address,
        street_number: user.location.address_number,
        zip_code: user.location.postal_code,
      },
    },
    items: [],
    notification_url:
      "https://api.ecommerce-app.agustin-ribotta.xyz/api/notifications",
    back_urls: {
      success: `${process.env.CORS_ORIGIN}/success`,
      failure: `${process.env.CORS_ORIGIN}/failed`,
      pending: `${process.env.CORS_ORIGIN}/pending`,
    },
    statement_descriptor: "Ecommerce by AguzzDev",
    auto_return: "approved",
    binary_mode: true,
  };
  const cart = await userCart(req.user.id);

  const response = await mercadopago.preferences.create({
    ...preference,
    items: cart.products.map(({ price, _id, img, ...rest }) => ({
      ...rest,
      id: _id,
      picture_url: img[0],
      unit_price: price,
      currency_id: "ARS",
    })),
  });

  const preferenceId = response.body.id;

  const userAlreadyPaymentCreated = await Payment.findOne({
    userId: req.user.id,
  });

  if (userAlreadyPaymentCreated) {
    await Payment.findOneAndUpdate(
      { userId: req.user.id },
      { orderId: preferenceId }
    );
    return res.sendStatus(200);
  }

  await Payment.create({
    userId: req.user.id,
    orderId: preferenceId,
  });

  res.sendStatus(200);
});

export const listenNotifications = asyncWrapper(async (req, res) => {
  try {
    if (req.query.type === "payment") {
      const res = await mercadopago.payment.findById(req.query["data.id"]);

      if (res.response.status_detail == "accredited") {
        const user = await findUserByEmail(res.response.payer.email);
        const getOrder = await Payment.findOne({ userId: user._id });

        const payer = res.response.additional_info.payer.address;

        await Order.create({
          orderId: getOrder.orderId,
          userId: getOrder.userId,
          products: res.response.additional_info.items.map(({ id }) => id),
          location: {
            address: payer.street_name,
            address_number: payer.street_number,
            postal_code: payer.zip_code,
          },
          status: "Pagado",
          sending: true,
          total: user.cart.total,
        });

        await Payment.deleteOne({ userId: user._id });
        await User.findByIdAndUpdate(user._id, {
          cart: { products: [], total: 0 },
        });

        res.sendStatus(204);
      }

      res.status(400).send("Pago no acreditado");
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500);
  }
});
